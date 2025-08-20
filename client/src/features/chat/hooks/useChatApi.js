import { useState } from "react";

export const useChatApi = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          role: "user",
          conversation_id: "dummy",
        }),
      });

      if (!response.ok) {
        throw new Error("Error with API request");
      }

      const data = await response.json();
      return { success: true, response: data.response };
    } catch (error) {
      return { success: false, response: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
