/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Menu, Home, Compass, PlaySquare, Clock, ThumbsUp, ThumbsDown, Share2, MoreVertical, User, Bell, Video, Maximize, PictureInPicture, Gauge, Download, Moon, Sun, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Comment {
    author: string;
    comment: string;
    time: string;
    likes: number;
}

interface VideoData {
    id: number;
    title: string;
    channel: string;
    channelIcon: string;
    views: string;
    time: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
    description: string;
    likes: number;
    dislikes: number;
    category: string;
    subscribers: string;
    comments: Comment[];
}

// 1. सबसे ऊपर - VIDEO DATA
const initialVideos: VideoData[] = [
    {
        id: 1,
        title: "🌸 अनामिका का पहला वीडियो - आप सबको नमस्ते",
        channel: "अनामिका का चैनल",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika&background=ff1493&color=fff&size=100",
        views: "1.2M",
        time: "3 दिन पहले",
        duration: "15:30",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "हेलो दोस्तों! आज से शुरू हो रहा है मेरा नया चैनल 'अनामिका का वीडियो'। यहाँ आपको मिलेंगे मज़ेदार वीडियो, ट्रैवल व्लॉग, कुकिंग रेसिपी और भी बहुत कुछ! तो चैनल को सब्सक्राइब करना मत भूलना 💕",
        likes: 1234,
        dislikes: 56,
        category: "व्लॉग",
        subscribers: "1M",
        comments: [
            {
                author: "राजेश कुमार",
                comment: "बहुत सुंदर वीडियो दीदी! आपका चैनल जरूर चलेगा",
                time: "2 दिन पहले",
                likes: 45
            },
            {
                author: "प्रिया शर्मा",
                comment: "अनामिका जी, आपकी आवाज़ बहुत प्यारी है",
                time: "1 दिन पहले",
                likes: 23
            }
        ]
    },
    {
        id: 2,
        title: "🍳 आसान कुकिंग रेसिपी - 5 मिनट में बनाएं",
        channel: "अनामिका की रसोई",
        views: "500K",
        time: "1 हफ्ता पहले",
        duration: "10:45",
        thumbnail: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Kitchen&background=ff1493&color=fff&size=100",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        description: "आज सीखिए बेहद आसान और झटपट बनने वाली रेसिपी। 5 मिनट में ऐसा नाश्ता कि सब उंगलियां चाटते रह जाएं!",
        likes: 2345,
        dislikes: 89,
        category: "कुकिंग",
        subscribers: "500K",
        comments: [
            {
                author: "मोहन सिंह",
                comment: "दीदी ये रेसिपी तो कमाल है! मैंने बना ली",
                time: "5 दिन पहले",
                likes: 67
            }
        ]
    },
    {
        id: 3,
        title: "✈️ मनाली ट्रैवल व्लॉग - बर्फ में मस्ती",
        channel: "अनामिका ट्रैवल्स",
        views: "2.1M",
        time: "2 हफ्ते पहले",
        duration: "20:15",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Travel&background=ff1493&color=fff&size=100",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "चलिए दोस्तों आज हम चलते हैं मनाली! देखिए कैसी है वहां की बर्फीली वादियां। पहाड़ों की रानी का असली रूप।",
        likes: 3456,
        dislikes: 123,
        category: "ट्रैवल",
        subscribers: "800K",
        comments: [
            {
                author: "सीमा रॉय",
                comment: "बहुत खूबसूरत जगह है, आपका व्लॉग देखकर लगा जैसे मैं भी वहां हूं",
                time: "3 दिन पहले",
                likes: 89
            }
        ]
    },
    {
        id: 4,
        title: "💃 अनामिका का डांस - लता जी के गाने पर",
        channel: "अनामिका डांस",
        views: "3.5M",
        time: "4 दिन पहले",
        duration: "5:20",
        thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Dance&background=ff1493&color=fff&size=100",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        description: "लता मंगेशकर जी के इस पुराने गाने पर मेरा डांस। उम्मीद है आपको पसंद आएगा।",
        likes: 5678,
        dislikes: 234,
        category: "संगीत",
        subscribers: "1.2M",
        comments: []
    },
    {
        id: 5,
        title: "📱 टेक टिप्स - मोबाइल की ये ट्रिक जानते हैं?",
        channel: "अनामिका टेक",
        views: "800K",
        time: "1 दिन पहले",
        duration: "12:30",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Tech&background=ff1493&color=fff&size=100",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "क्या आप जानते हैं आपके मोबाइल में छिपी हैं ये 10 गजब की ट्रिक्स? देखिए इस वीडियो में।",
        likes: 4321,
        dislikes: 98,
        category: "टेक्नोलॉजी",
        subscribers: "400K",
        comments: []
    },
    {
        id: 6,
        title: "🏋️‍♀️ फिटनेस टिप्स - 7 दिन में बदलें",
        channel: "अनामिका फिटनेस",
        views: "1.8M",
        time: "6 दिन पहले",
        duration: "18:45",
        thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Fitness&background=ff1493&color=fff&size=100",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        description: "सिर्फ 7 दिन में अपनी फिटनेस में लाएं बदलाव। ये आसान एक्सरसाइज आपको बनाएंगी फिट",
        likes: 6789,
        dislikes: 145,
        category: "फिटनेस",
        subscribers: "600K",
        comments: []
    },
    {
        id: 7,
        title: "🌟 मेरा नया सफर - आप सबके साथ",
        channel: "अनामिका का व्लॉग",
        channelIcon: "https://ui-avatars.com/api/?name=Anamika+Vlog&background=ff1493&color=fff&size=100",
        views: "100",
        time: "आज",
        duration: "5:00",
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "नमस्ते दोस्तों! आज मैं आपके साथ अपना एक नया अनुभव शेयर करने जा रही हूँ। उम्मीद है आपको पसंद आएगा।",
        likes: 50,
        dislikes: 2,
        category: "व्लॉग",
        subscribers: "1K",
        comments: []
    }
];

export default function App() {
    // 2. बीच में - VARIABLES (State)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
    const [activeCategory, setActiveCategory] = useState('सब');
    const [videos, setVideos] = useState<VideoData[]>(initialVideos);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{name: string, email: string} | null>(null);
    const [subscribedChannels, setSubscribedChannels] = useState<string[]>([]);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [newVideo, setNewVideo] = useState({
        title: '',
        channel: 'मेरा चैनल',
        category: 'व्लॉग',
        description: '',
        thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
    });

    const categories = ['सब', 'व्लॉग', 'कुकिंग', 'ट्रैवल', 'संगीत', 'टेक्नोलॉजी', 'फिटनेस'];

    // 3. फिर - FUNCTIONS
    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                video.channel.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'सब' || video.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory, videos]);

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        const videoToAdd: VideoData = {
            id: videos.length + 1,
            title: newVideo.title || 'बिना टाइटल का वीडियो',
            channel: newVideo.channel,
            channelIcon: `https://ui-avatars.com/api/?name=${newVideo.channel}&background=random&color=fff`,
            views: '0',
            time: 'अभी-अभी',
            duration: '0:00',
            thumbnail: newVideo.thumbnail,
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: newVideo.description,
            likes: 0,
            dislikes: 0,
            category: newVideo.category,
            subscribers: '0',
            comments: []
        };
        setVideos([videoToAdd, ...videos]);
        setIsUploadModalOpen(false);
        setNewVideo({
            title: '',
            channel: 'मेरा चैनल',
            category: 'व्लॉग',
            description: '',
            thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
        });
    };

    const handlePlayVideo = (video: typeof initialVideos[0]) => {
        setSelectedVideo(video);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToHome = () => {
        setSelectedVideo(null);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setUser({ name: 'अनामिका यूजर', email: 'user@example.com' });
        setIsLoginModalOpen(false);
    };

    const toggleSubscribe = (channelName: string) => {
        if (subscribedChannels.includes(channelName)) {
            setSubscribedChannels(subscribedChannels.filter(c => c !== channelName));
        } else {
            setSubscribedChannels([...subscribedChannels, channelName]);
        }
    };

    const handleDownload = (id: number) => {
        setDownloadingId(id);
        setTimeout(() => {
            setDownloadingId(null);
            alert("वीडियो सफलतापूर्वक डाउनलोड हो गया! (Simulated)");
        }, 2000);
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedVideo || !videoRef.current) return;
            
            // Don't trigger shortcuts if user is typing in an input or textarea
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case ' ':
                    e.preventDefault();
                    if (videoRef.current.paused) videoRef.current.play();
                    else videoRef.current.pause();
                    break;
                case 'f':
                    e.preventDefault();
                    if (document.fullscreenElement) document.exitFullscreen();
                    else videoRef.current.parentElement?.requestFullscreen();
                    break;
                case 'p':
                    e.preventDefault();
                    togglePiP();
                    break;
                case 'm':
                    e.preventDefault();
                    videoRef.current.muted = !videoRef.current.muted;
                    break;
                case 'arrowright':
                    e.preventDefault();
                    videoRef.current.currentTime += 5;
                    break;
                case 'arrowleft':
                    e.preventDefault();
                    videoRef.current.currentTime -= 5;
                    break;
                case 'arrowup':
                    e.preventDefault();
                    videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
                    break;
                case 'arrowdown':
                    e.preventDefault();
                    videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedVideo]);

    const togglePiP = async () => {
        if (!videoRef.current) return;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (error) {
            console.error("PiP error:", error);
        }
    };

    const changePlaybackRate = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    // 4. सबसे नीचे - UI (Event Listeners are inside JSX)
    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 px-4 h-14 flex items-center justify-between border-b transition-colors ${isDarkMode ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Menu size={24} />
                    </button>
                    <div 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={handleBackToHome}
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-1.5 rounded-lg shadow-lg transform group-hover:scale-110 transition duration-300">
                                <PlaySquare size={22} fill="white" className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Anamika
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
                                Platform
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-2xl px-4 flex items-center">
                    <div className="flex w-full">
                        <div className="flex-1 flex items-center bg-[#121212] border border-white/10 rounded-l-full px-4 focus-within:border-blue-500">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input 
                                type="text" 
                                placeholder="सर्च करें" 
                                className="w-full bg-transparent py-2 outline-none text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-white/10 px-5 rounded-r-full border-l border-white/10 hover:bg-white/20 transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
                    >
                        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                    <button 
                        onClick={() => setIsUploadModalOpen(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        <Video size={20} className="text-pink-500" />
                        <span className="text-sm font-bold hidden sm:block">अपलोड</span>
                    </button>
                    <button className={`p-2 rounded-full hidden sm:block ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                        <Bell size={24} />
                    </button>
                    {isLoggedIn ? (
                        <button className="p-2 hover:bg-white/10 rounded-full">
                            <User size={24} className="bg-pink-600 rounded-full p-1 text-white" />
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsLoginModalOpen(true)}
                            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-pink-700 transition-colors"
                        >
                            <LogIn size={18} />
                            <span>लॉगिन</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Login Modal */}
            <AnimatePresence>
                {isLoginModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsLoginModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative w-full max-w-sm rounded-2xl p-8 shadow-2xl border ${isDarkMode ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-gray-200'}`}
                        >
                            <div className="flex flex-col items-center mb-6">
                                <div className="bg-pink-600 p-3 rounded-2xl mb-4">
                                    <PlaySquare size={32} fill="white" className="text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">Anamika Platform</h2>
                                <p className="text-sm text-gray-500 mt-1">अपना अकाउंट लॉगिन करें</p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="ईमेल" 
                                        className={`w-full rounded-xl px-4 py-3 outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-pink-500' : 'bg-gray-50 border-gray-200 focus:border-pink-500'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="password" 
                                        placeholder="पासवर्ड" 
                                        className={`w-full rounded-xl px-4 py-3 outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-pink-500' : 'bg-gray-50 border-gray-200 focus:border-pink-500'}`}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-600/20"
                                >
                                    लॉगिन करें
                                </button>
                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">नया अकाउंट बनाना चाहते हैं? <button className="text-pink-500 font-bold">साइनअप</button></p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#1e1e1e] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-white/10"
                        >
                            <h2 className="text-xl font-bold mb-4">नया वीडियो अपलोड करें</h2>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">टाइटल</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-pink-500"
                                        value={newVideo.title}
                                        onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                                        placeholder="वीडियो का टाइटल लिखें"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">कैटेगरी</label>
                                    <select 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-pink-500"
                                        value={newVideo.category}
                                        onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                                    >
                                        {categories.filter(c => c !== 'सब').map(c => (
                                            <option key={c} value={c} className="bg-[#1e1e1e]">{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">डिस्क्रिप्शन</label>
                                    <textarea 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-pink-500 h-24 resize-none"
                                        value={newVideo.description}
                                        onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                                        placeholder="वीडियो के बारे में बताएं"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={() => setIsUploadModalOpen(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 py-2.5 rounded-xl font-bold transition-colors"
                                    >
                                        रद्द करें
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-pink-600/20"
                                    >
                                        अपलोड करें
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex">
                {/* Sidebar - Desktop */}
                <aside className="w-64 hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-3">
                    <nav className="space-y-1">
                        <SidebarItem icon={<Home size={22} />} label="होम" active onClick={handleBackToHome} />
                        <SidebarItem icon={<Compass size={22} />} label="एक्सप्लोर" />
                        <SidebarItem icon={<PlaySquare size={22} />} label="सब्सक्रिप्शन" />
                        <hr className="my-3 border-white/10" />
                        <SidebarItem icon={<Clock size={22} />} label="इतिहास" />
                        <SidebarItem icon={<PlaySquare size={22} />} label="आपके वीडियो" />
                        <SidebarItem icon={<Clock size={22} />} label="बाद में देखें" />
                        <hr className="my-3 border-white/10" />
                        <h3 className="px-3 py-2 text-sm font-semibold text-gray-400 uppercase">सब्सक्रिप्शन</h3>
                        <SidebarItem 
                            icon={<img src="https://ui-avatars.com/api/?name=Anamika&background=ff1493&color=fff" className="w-6 h-6 rounded-full" />} 
                            label="अनामिका का चैनल" 
                        />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-6">
                    <AnimatePresence mode="wait">
                        {!selectedVideo ? (
                            <motion.div 
                                key="grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Categories */}
                                <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                                activeCategory === cat 
                                                ? 'bg-white text-black' 
                                                : 'bg-white/10 hover:bg-white/20'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Video Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                                    {filteredVideos.map(video => (
                                        <VideoCard 
                                            key={video.id} 
                                            video={video} 
                                            onClick={() => handlePlayVideo(video)} 
                                        />
                                    ))}
                                </div>
                                
                                {filteredVideos.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                        <Search size={48} className="mb-4 opacity-20" />
                                        <p>कोई वीडियो नहीं मिला</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="player"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col lg:flex-row gap-6"
                            >
                                {/* Player Section */}
                                <div className="flex-1">
                                    <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl group/player">
                                        <video 
                                            ref={videoRef}
                                            src={selectedVideo.videoUrl} 
                                            controls 
                                            autoPlay 
                                            className="w-full h-full object-contain"
                                        />
                                        
                                        {/* Custom Overlay Controls (Optional, but let's add some quick buttons) */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/player:opacity-100 transition-opacity">
                                            <div className="relative group/speed">
                                                <button className="p-2 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors flex items-center gap-1">
                                                    <Gauge size={18} />
                                                    <span className="text-xs font-bold">{playbackRate}x</span>
                                                </button>
                                                <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md rounded-lg p-1 hidden group-hover/speed:block border border-white/10 shadow-xl">
                                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                                        <button 
                                                            key={rate}
                                                            onClick={() => changePlaybackRate(rate)}
                                                            className={`block w-full text-left px-4 py-1.5 text-xs rounded hover:bg-white/10 transition-colors ${playbackRate === rate ? 'text-pink-500 font-bold' : ''}`}
                                                        >
                                                            {rate}x
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={togglePiP}
                                                className="p-2 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors"
                                                title="Picture in Picture (P)"
                                            >
                                                <PictureInPicture size={18} />
                                            </button>
                                            <button 
                                                onClick={() => videoRef.current?.parentElement?.requestFullscreen()}
                                                className="p-2 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors"
                                                title="Fullscreen (F)"
                                            >
                                                <Maximize size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h1 className="text-xl font-bold leading-tight">{selectedVideo.title}</h1>
                                        
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                                            <div className="flex items-center gap-3">
                                                <img src={selectedVideo.channelIcon} className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <h3 className="font-bold text-base">{selectedVideo.channel}</h3>
                                                    <p className="text-xs text-gray-400">{selectedVideo.subscribers} सब्सक्राइबर्स</p>
                                                </div>
                                                <button 
                                                    onClick={() => toggleSubscribe(selectedVideo.channel)}
                                                    className={`ml-4 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                                        subscribedChannels.includes(selectedVideo.channel)
                                                        ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700')
                                                        : 'bg-pink-600 text-white hover:bg-pink-700'
                                                    }`}
                                                >
                                                    {subscribedChannels.includes(selectedVideo.channel) ? (
                                                        <span className="flex items-center gap-1"><CheckCircle2 size={16} /> सब्सक्राइब किया</span>
                                                    ) : 'सब्सक्राइब करें'}
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                                <div className={`flex items-center rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-l-full border-r transition-colors ${isDarkMode ? 'hover:bg-white/10 border-white/10' : 'hover:bg-black/5 border-gray-200'}`}>
                                                        <ThumbsUp size={18} />
                                                        <span className="text-sm">{selectedVideo.likes}</span>
                                                    </button>
                                                    <button className={`px-4 py-2 rounded-r-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                                                        <ThumbsDown size={18} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => handleDownload(selectedVideo.id)}
                                                    disabled={downloadingId === selectedVideo.id}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                >
                                                    <Download size={18} className={downloadingId === selectedVideo.id ? 'animate-bounce' : ''} />
                                                    <span className="text-sm">{downloadingId === selectedVideo.id ? 'डाउनलोड हो रहा...' : 'डाउनलोड'}</span>
                                                </button>
                                                <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                                    <Share2 size={18} />
                                                    <span className="text-sm">शेयर</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 bg-white/10 p-3 rounded-xl">
                                            <div className="flex gap-2 text-sm font-bold mb-1">
                                                <span>{selectedVideo.views} व्यूज़</span>
                                                <span>{selectedVideo.time}</span>
                                            </div>
                                            <p className="text-sm whitespace-pre-wrap text-gray-200">
                                                {selectedVideo.description}
                                            </p>
                                        </div>

                                        {/* Comments */}
                                        <div className="mt-6">
                                            <h3 className="text-lg font-bold mb-4">{selectedVideo.comments.length} कमेंट्स</h3>
                                            <div className="space-y-6">
                                                {selectedVideo.comments.map((comment, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                                                            {comment.author[0]}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-sm font-bold">@{comment.author.replace(' ', '').toLowerCase()}</span>
                                                                <span className="text-xs text-gray-400">{comment.time}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-200">{comment.comment}</p>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                                                                    <ThumbsUp size={14} />
                                                                    <span className="text-xs">{comment.likes}</span>
                                                                </button>
                                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                                    <ThumbsDown size={14} />
                                                                </button>
                                                                <button className="text-xs font-bold text-gray-400 hover:text-white">जवाब दें</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations Section */}
                                <div className="lg:w-[400px] space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">अगला वीडियो</h3>
                                    {initialVideos.filter(v => v.id !== selectedVideo.id).map(video => (
                                        <div 
                                            key={video.id} 
                                            className="flex gap-3 cursor-pointer group"
                                            onClick={() => handlePlayVideo(video)}
                                        >
                                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                <span className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-bold">{video.duration}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">{video.title}</h4>
                                                <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
                                                <div className="flex gap-1 text-[10px] text-gray-500 mt-0.5">
                                                    <span>{video.views} व्यूज़</span>
                                                    <span>•</span>
                                                    <span>{video.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }> = ({ icon, label, active = false, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-5 px-3 py-2.5 rounded-xl transition-colors ${
                active ? 'bg-white/10 font-bold' : 'hover:bg-white/5'
            }`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}

const VideoCard: React.FC<{ video: VideoData, onClick: () => void }> = ({ video, onClick }) => {
    return (
        <div className="flex flex-col gap-3 cursor-pointer group" onClick={onClick}>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-bold">
                    {video.duration}
                </span>
            </div>
            <div className="flex gap-3">
                <img src={video.channelIcon} className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="flex flex-col">
                    <h3 className="font-bold text-base line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
                    <div className="flex gap-1 text-sm text-gray-400">
                        <span>{video.views} व्यूज़</span>
                        <span>•</span>
                        <span>{video.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
