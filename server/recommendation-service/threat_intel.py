import os
from dotenv import load_dotenv
load_dotenv()
import requests
from fastapi import HTTPException, Request
from slowapi.util import get_remote_address
from typing import Callable

ABUSEIPDB_URL = "https://api.abuseipdb.com/api/v2/check"

async def check_threat_ip(request: Request, call_next: Callable):
    """
    Middleware to check client IP against AbuseIPDB threat intelligence feed.
    Blocks requests from IPs with abuse confidence score > 50.
    Includes extensive logging for debugging.
    """
    # Load API key from environment, fail early if not set
    api_key = os.environ.get("ABUSEIPDB_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="AbuseIPDB API key not configured")
    
    # ====== FOR TESTING ======
    # To force malicious IP for testing, uncomment below and set the IP you want to check
    # client_ip = "116.193.190.8"  # Swap out for any recent bad IP at abuseipdb.com
    # For production, use the next line instead:
    client_ip = get_remote_address(request)
    # =========================

    try:
        headers = {"Key": api_key, "Accept": "application/json"}
        params = {"ipAddress": client_ip, "maxAgeInDays": 90}
        response = requests.get(ABUSEIPDB_URL, headers=headers, params=params, timeout=5)
        response.raise_for_status()
        result = response.json()
        data = result.get("data", {})
        print(f"AbuseIPDB Response for {client_ip}:", data)  # <-- DEBUG PRINT

        # Log and block if score high
        score = data.get("abuseConfidenceScore", 0)
        print(f"AbuseConfidenceScore for {client_ip}: {score}")  # <-- DEBUG PRINT

        if score > 50:
            print(f"Blocked request from IP {client_ip} with AbuseConfidenceScore {score}")
            raise HTTPException(status_code=403, detail="Request blocked: Malicious IP detected")
        else:
            print(f"Allowed IP {client_ip} (score: {score})")

        return await call_next(request)
    except requests.RequestException as e:
        print(f"Threat intelligence check failed for {client_ip}: {str(e)}")
        return await call_next(request)
