import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const tagOptions = [
  'python', 'machine learning', 'ai', 'beginner', 'frontend',
  'javascript', 'programming', 'react', 'scikit-learn'
];

const LandingPage3 = () => {
    const [expanded, setExpanded] = useState(false);
    const [profession] = useState('React Developer')
    const [preferences, setPreferences] = useState(['python', 'machine learning', 'ai'])
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeTagIndex, setActiveTagIndex] = useState(-1);
    const [quizResult] = useState({ course: 'Intro to Javascript', score: 92.5 })
    const [recommendations, setRecommendations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [tagInput, setTagInput] = useState('')
    const [allTags, setAllTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])

    

  useEffect(() => {
        const filtered = tagOptions.filter(tag => 
            tag.toLowerCase().includes(tagInput.toLowerCase()) &&
            !preferences.includes(tag)
        );
        setFilteredTags(filtered);
        setActiveTagIndex(-1);
    }, [tagInput, preferences]);

    // Handle keyboard navigation in dropdown
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveTagIndex(prev => Math.min(prev + 1, filteredTags.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveTagIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && activeTagIndex >= 0) {
            e.preventDefault();
            addTag(filteredTags[activeTagIndex]);
        } else if (e.key === 'Enter' && tagInput && filteredTags.length > 0) {
            e.preventDefault();
            addTag(filteredTags[0]);
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Add tag to preferences
    const addTag = (tag) => {
        if (!preferences.includes(tag)) {
            setPreferences([...preferences, tag]);
        }
        setTagInput('');
        setShowDropdown(false);
    };

    // Remove tag from preferences
    const removeTag = (tag) => {
        setPreferences(preferences.filter(t => t !== tag));
    };



     // 2) Handler: call the /recommend endpoint
    // ----------------------------------------
    const fetchRecommendations = async () => {
        setLoading(true)
        setError(null)

        const payload = {
        user: {
            profession,
            preferences,
            quiz: quizResult
        }
        }

        try {
        const res = await fetch('http://127.0.0.1:8000/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data = await res.json()
        setRecommendations(data.recommendations)
        } catch (err) {
        console.error('🎭 Oops in fetchRecommendations:', err)
        setError('Failed to load recommendations. Check the console for clues!')
        } finally {
        setLoading(false)
        }
    }

    return(
        <div className="w-full h-full">
            <header className="py-4 bg-black sm:py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="shrink-0">
                            <a href="#" className="flex">
                                <img className="w-auto h-9" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg" alt="" />
                            </a>
                        </div>
        
                        <div className="flex md:hidden">
                            <button 
                                type="button" 
                                className="text-white" 
                                onClick={() => setExpanded(!expanded)}
                                aria-expanded={expanded}
                            >
                                {!expanded ? (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
        
                        <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
                            <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>
                            <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>
                            <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>
                            <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>
                        </nav>
        
                        <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                            <Link to="/quiz" className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Take Free Test </Link>
                        </div>
                    </div>
        
                    {expanded && (
                        <nav>
                            <div className="flex flex-col pt-8 pb-4 space-y-6">
                                <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>
                                <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>
                                <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>
                                <a href="#" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>
                                <div className="relative inline-flex items-center justify-center group">
                                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                                    <a href="#" className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a>
                                </div>
                            </div>
                        </nav>
                    )}
                    </div>
            </header>

            <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center grid-cols-1 gap-y-12">
                    <div>
                        {/* ... existing content ... */}

                        {/* 💡 Updated Tag Selection UI */}
                        <div className="mt-8 sm:mt-12 text-white">
                                <label htmlFor="tag-input" className="block mb-2 text-lg font-medium text-white">
                                    Select Your Interests (Tags)
                                </label>
                                
                                <div className="relative">
                                    <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg min-h-[56px]">
                                        {/* Selected Tags */}
                                        {preferences.map(tag => (
                                            <div 
                                                key={tag} 
                                                className="flex items-center px-3 py-1 text-sm bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white"
                                            >
                                                {tag}
                                                <button 
                                                    type="button" 
                                                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        
                                        {/* Tag Input */}
                                        <input
                                            id="tag-input"
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => {
                                                setTagInput(e.target.value);
                                                setShowDropdown(true);
                                            }}
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => setShowDropdown(true)}
                                            className="flex-1 min-w-[120px] p-1 text-black bg-transparent border-none focus:ring-0 focus:outline-none"
                                            placeholder={preferences.length ? "" : "Type to search tags..."}
                                        />
                                    </div>
                                    
                                    {/* Dropdown Suggestions */}
                                    {showDropdown && filteredTags.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {filteredTags.map((tag, index) => (
                                                <div
                                                    key={tag}
                                                    className={`p-3 text-black cursor-pointer ${
                                                        index === activeTagIndex 
                                                            ? 'bg-gradient-to-r from-cyan-100 to-purple-100' 
                                                            : 'hover:bg-gray-100'
                                                    }`}
                                                    onClick={() => addTag(tag)}
                                                >
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <p className="mt-2 text-sm text-gray-400">
                                    {preferences.length}/10 tags selected
                                </p>
                        </div>

                    {/* 🔘 Submit Button */}
                    <div className="mt-8 sm:mt-12">
                        <button
                            onClick={fetchRecommendations}
                            disabled={loading}
                            className={`px-6 py-3 text-base font-semibold rounded-full transition-all ${
                                loading ? 'bg-gray-400' : 'bg-white hover:opacity-90'
                            }`}
                            >
                            {loading ? (
                                <span className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">...</svg>
                                Crunching numbers...
                                </span>
                            ) : (
                                'Get My Course Picks!'
                            )}
                        </button>
                    </div>

                    {/* 🚨 Error Message */}
                    {error && (
                        <p className="mt-4 text-red-400">{error}</p>
                    )}

                    {/* 🎯 Show Recommendations */}
                    {recommendations && (
                        <div className="mt-10 space-y-6">
                        <h2 className="text-2xl text-white">Your Top Picks:</h2>
                        <ul className="space-y-4">
                            {recommendations.map((rec) => (
                            <li
                                key={rec.id}
                                className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                <p className="text-lg font-medium text-white">{rec.title}</p>
                                <p className="text-sm text-gray-400">({rec.id})</p>
                                </div>
                                <span className="text-sm font-semibold text-cyan-400">
                                {rec.score}% match
                                </span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </section>


            <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    {/* Main Content Section */}
                    <div className="grid items-center grid-cols-1 gap-y-12">
                        <div>
                            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">Elevating The Developers</h1>
                            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                                Come take a Challenge and Test Yourself.<br />
                                See where you stand and grind to level yourself up.
                                <br />We're here to help
                            </p>

                            <form className="relative mt-8 rounded-full sm:mt-12">
                                <div className="relative">
                                    <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="email" 
                                            placeholder="Try Java Developer, React Dev etc." 
                                            className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" 
                                        />
                                    </div>
                                </div>
                                <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                                    <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90">Search Courses</button>
                                </div>
                            </form>

                            <div className="mt-8 sm:mt-12">
                                <p className="text-lg font-normal text-white">Trusted by 50k+ users</p>
                                <div className="flex items-center mt-3">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                                    fill="url(#starGradient)"
                                                />
                                                <defs>
                                                    <linearGradient id="starGradient" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stopColor="#06b6d4" />
                                                        <stop offset="100%" stopColor="#8b5cf6" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-base font-normal text-white"> 4.1/5 </span>
                                    <span className="ml-1 text-base font-normal text-gray-500"> (14k Reviews) </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Sections Below Main Content */}
                    <div className="mt-20 space-y-20">
                        {/* Profile 1 */}
                        <div className="relative">
                            <div className="absolute inset-0">
                                <svg 
                                    className="blur-3xl filter opacity-70" 
                                    style={{ filter: 'blur(64px)' }} 
                                    width="444" 
                                    height="536" 
                                    viewBox="0 0 444 536" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#gradient)" />
                                    <defs>
                                        <linearGradient id="gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="absolute inset-0">
                                {/* <img className="object-cover w-full h-full opacity-50" src="https://images.pexels.com/photos/14598237/pexels-photo-14598237.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load" alt="texture" /> */}
                            </div>

                            <div className="relative flex flex-col items-center justify-center h-full py-12">
                                <img 
                                    className="w-48 h-48 rounded-full border-4 border-white/20 shadow-xl mb-8 hover:border-purple-300 transition-all duration-300" 
                                    src="/your-image.jpg" 
                                    alt="Your Name" 
                                />
                                <div className="text-center max-w-2xl px-4">
                                    <h2 className="text-3xl font-bold text-white mb-4">Sunidhi S Prabhu</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                        Senior React Developer & Technical Lead
                                        <br />
                                        8+ years experience building scalable web applications
                                    </p>
                                    <div className="flex justify-center space-x-6">
                                        <a href="https://x.com/sunidhi_prabhu" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00acee] transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                                            </svg>
                                        </a>
                                        <a href="https://github.com/sunidhi-prabhu" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/sunidhi-p-b6b301287/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#0A66C2] transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile 2 */}
                        <div className="relative">
                            <div className="absolute inset-0">
                                <svg 
                                    className="blur-3xl filter opacity-70" 
                                    style={{ filter: 'blur(64px)' }} 
                                    width="444" 
                                    height="536" 
                                    viewBox="0 0 444 536" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#gradient)" />
                                    <defs>
                                        <linearGradient id="gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="absolute inset-0">
                                <img className="object-cover w-full h-full opacity-50" src="https://images.pexels.com/photos/31407301/pexels-photo-31407301/free-photo-of-solo-mountaineer-exploring-snowy-peak-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load" alt="texture" />
                            </div>

                            <div className="relative flex flex-col items-center justify-center h-full py-12">
                                <img 
                                    className="w-48 h-48 rounded-full border-4 border-white/20 shadow-xl mb-8 hover:border-purple-300 transition-all duration-300" 
                                    src="/another-image.jpg" 
                                    alt="Another Name" 
                                />
                                <div className="text-center max-w-2xl px-4">
                                    <h2 className="text-3xl font-bold text-white mb-4">Satyam Pratik Bharti</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                        Full Stack Developer & Open Source Contributor
                                        <br />
                                        Specializing in Node.js and Cloud Infrastructure
                                    </p>
                                     <div className="flex justify-center space-x-6">
                                        <a href="https://x.com/satyam_spb" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00acee] transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                                            </svg>
                                        </a>
                                        <a href="https://github.com/satyam-spb" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/satyam-pratik/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#0A66C2] transition-colors">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
                
    )
}
export default LandingPage3;