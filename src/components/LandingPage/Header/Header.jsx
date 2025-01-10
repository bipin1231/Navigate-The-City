import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Home, Map, Route, MessageCircle, Contact, LayoutDashboard, Bus, MessageSquare } from 'lucide-react';
import authService from '../../../appwrite/auth';
import { logout } from '../../../ticketStore/authSlice';

const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      className="relative group h-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        to={to} 
        className="h-full flex items-center px-4 relative"
      >
        <div className="flex items-center space-x-2">
          {Icon && (
            <motion.div
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`} />
            </motion.div>
          )}
          <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-500'}`}>
            {children}
          </span>
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
      
      <motion.div
        className="absolute inset-0 bg-blue-50 z-[-1]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const DropdownLink = ({ to, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div 
      className="relative h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className="h-full flex items-center px-4 space-x-2 relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && (
          <motion.div
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
          </motion.div>
        )}
        <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>{children}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
          >
            <Link
              to={to}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <motion.div whileHover={{ x: 4 }}>
                {children}
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Header() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const [userTypeInfo, setUserTypeInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (status && userData?.userType?.total > 0) {
      setUserTypeInfo(userData.userType.documents[0].type);
    } else {
      setUserTypeInfo(null);
    }
  }, [status, userData]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          setUserTypeInfo(null);
          dispatch(logout());
        }
      } catch (e) {
        console.error("Error checking login status:", e);
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  return (
    <motion.header 
      className={`fixed w-full z-[2000] top-0 transition-all duration-500
        ${scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-md"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between lg:justify-start">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src="../logo1.png" 
              className="w-10 h-10 mr-3"
              alt="Navigate The City Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <Link to={"/home"}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Navigate The City
            </h1>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center h-full flex-grow">
            <nav className="flex ml-auto items-center h-full space-x-1">
              {userTypeInfo !== "company" ? (
                <>
                  <NavLink to="/home" icon={Home}>Home</NavLink>
                  <NavLink to="/map" icon={Map}>Map</NavLink>
                  <NavLink to="/route" icon={Route}>Route</NavLink>
                  <NavLink to="/contact" icon={Contact}>Contact</NavLink>
                  {userTypeInfo === "driver" && <NavLink to="/msg" icon={MessageCircle}>Message</NavLink>}
                </>
              ) : (
                <>
                  <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                  <NavLink to="/map" icon={Map}>Map</NavLink>
                  <NavLink to="/route" icon={Route}>Route</NavLink>
                  <DropdownLink to="/manageroutes" icon={Route}>Manage Routes</DropdownLink>
                  <DropdownLink to="/managebus" icon={Bus}>Manage Bus</DropdownLink>
                  <NavLink to="/ticketmessage" icon={MessageSquare}>Ticket Message</NavLink>
                </>
              )}
            </nav>

            <div className="ml-auto">
              {!status ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/loginpage" 
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(logout())}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </div>

          <motion.button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={menuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {userTypeInfo !== "company" ? (
                <>
                  <NavLink to="/home" icon={Home}>Home</NavLink>
                  <NavLink to="/map" icon={Map}>Map</NavLink>
                  <NavLink to="/route" icon={Route}>Route</NavLink>
                  <NavLink to="/contact" icon={Contact}>Contact</NavLink>
                  {userTypeInfo === "driver" && <NavLink to="/msg" icon={MessageCircle}>Message</NavLink>}
                </>
              ) : (
                <>
                  <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                  <NavLink to="/map" icon={Map}>Map</NavLink>
                  <NavLink to="/route" icon={Route}>Route</NavLink>
                  <NavLink to="/manageroutes" icon={Route}>Manage Routes</NavLink>
                  <NavLink to="/managebus" icon={Bus}>Manage Bus</NavLink>
                  <NavLink to="/ticketmessage" icon={MessageSquare}>Ticket Message</NavLink>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;