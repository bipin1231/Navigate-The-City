import React,{useRef,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Route, ChevronRight,Play,Pause,Volume2,Settings,Maximize } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import video1 from '../../assets/video1.mp4';

// VideoPlayer component remains the same...

const VideoPlayer = ({ src, poster, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
    if (isMuted) {
      setVolume(1);
      videoRef.current.volume = 1;
    } else {
      setVolume(0);
      videoRef.current.volume = 0;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seekTo = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div 
      className="relative group rounded-xl overflow-hidden shadow-2xl bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Controls */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div 
            className="h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={seekTo}
          >
            <div 
              className="h-full bg-blue-500 rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-blue-500"
                />
              </div>
              
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <select
                  value={playbackRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value);
                    setPlaybackRate(rate);
                    videoRef.current.playbackRate = rate;
                  }}
                  className="bg-transparent border-none text-sm hover:text-blue-400 focus:outline-none cursor-pointer"
                >
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <option key={rate} value={rate} className="text-black">
                      {rate}x
                    </option>
                  ))}
                </select>
              </div>
              
              <button onClick={toggleFullscreen} className="hover:text-blue-400 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Play Button (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500/80 hover:bg-blue-600/80 rounded-full p-6 transition-transform transform hover:scale-110"
        >
          <Play className="w-12 h-12 text-white" />
        </button>
      )}
    </div>
  );
};


const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const variants = {
    hidden: { 
      opacity: 0,
      rotateX: 45,
      y: 20
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
        ease: [0.645, 0.045, 0.355, 1]
      }
    }
  };

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.2, type: "spring" }}
      >
        <Icon className="h-8 w-8 text-blue-600 mb-4" />
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-5, 5, -5] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

const StaggeredList = ({ items }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.ol 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {items.map((step, index) => (
        <motion.li 
          key={index}
          variants={item}
          className="flex items-start"
          whileHover={{
            x: 10,
            transition: { duration: 0.2 }
          }}
        >
          <motion.span 
            className="flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 mr-4 flex-shrink-0 text-sm"
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.3 }
            }}
          >
            {index + 1}
          </motion.span>
          <span className="text-gray-700">{step}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <main>
        <motion.section 
          className="pt-32 pb-20 relative"
          style={{ opacity: headerOpacity }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center relative">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                <FloatingElement>
                  Real-Time Public Transport Tracking
                </FloatingElement>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xl mb-8 text-gray-600"
              >
                Never miss your bus or wait for one. Get live updates and plan your journey with ease.
              </motion.p>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <Link
                  to="/map"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Explore Map
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Background Decoration */}
              <motion.div
                className="absolute -z-10 inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)`,
                      width: `${200 + i * 100}px`,
                      height: `${200 + i * 100}px`,
                      left: `${50 - (100 + i * 50)}px`,
                      top: `${50 - (100 + i * 50)}px`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              Key Features
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={MapPin}
                title="Real-Time Tracking"
                description="See the exact location of buses and trains on an interactive map."
                index={0}
              />
              <FeatureCard
                icon={Clock}
                title="Live ETAs"
                description="Get up-to-date estimated arrival times for all stops."
                index={1}
              />
              <FeatureCard
                icon={Route}
                title="Route Planning"
                description="Plan your journey with real-time data for optimal routes."
                index={2}
              />
            </div>
          </div>
        </motion.section>

        {/* How It Works section with StaggeredList */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              How It Works
            </motion.h2>
            
            <div className="max-w-3xl mx-auto">
              <StaggeredList
                items={[
                  'Allow location access',
                  'View all nearby available public buses',
                  'Select your preferred route and see live vehicle locations',
                  'Receive updates on arrival times',
                ]}
              />
            </div>
          </div>
        </section>

        {/* Demo section remains similar but with faster transitions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              See NavigateTheCity in Action
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto space-y-16"
            >
              {[
                {
                  src: video1,
                  poster: '/images/real-time-tracking-poster.jpg',
                  title: 'Real-time Bus Tracking Demo',
                  description: [
                    'Real-time GPS tracking of buses displayed on an interactive map.',
                    'Precise and reliable arrival time predictions to minimize waiting time.',
                    'Intuitive, user-friendly interface for seamless navigation.',
                    'Comprehensive view of all available buses in the system.',
                    '*Bus movement animations could be further optimized for smoothness.*'
                  ],
                  
                },
                {
                  src: '/videos/mobile-app-walkthrough.mp4',
                  poster: '/images/mobile-app-walkthrough-poster.jpg',
                  title: 'How Passengers Can Share Their Live Location with a Moving Bus',
                  description: [
                    'Passengers can select the desired bus they want.',
                    'The bus staff receives the passenger\'s live location in real-time, ensuring a smooth pickup experience.',
                    'Simple and efficient process for better coordination between passengers and buses.'
                  ],
                  
                },
                {
                  src: '/videos/mobile-app-walkthrough.mp4',
                  poster: '/images/mobile-app-walkthrough-poster.jpg',
                  title: 'How Bus Staff Can Locate the Passenger',
                  description: [
                    'Bus staff can access a real-time map showing the passenger’s live location.',
                    'Passengers’ location is displayed with clear markers for easy identification.',
                 
                  ],
                  
                },
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex flex-col lg:flex-row gap-8 items-center"
                >
                  <div className="w-full lg:w-1/2">
                    <VideoPlayer src={video.src} poster={video.poster} />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{video.title}</h3>
                    <ul className="space-y-2">
                      {video.description.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-start"
                        >
                          <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}