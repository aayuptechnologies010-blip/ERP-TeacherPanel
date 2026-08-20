import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt2, HiOutlineBell, HiOutlineSun, HiOutlineMoon, HiOutlineLogout, HiOutlineUser, HiOutlineCog, HiOutlineChevronDown } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { dialog } from '../utils/dialog';
import { notify } from '../utils/notify';
import { Avatar } from '../components/ui';
import api from '../api/api';

export default function Navbar({ collapsed, onToggleSidebar, onToggleMobile }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    api.get('/notices', { params: { limit: 5 } }).then(({ data }) => setNotices(data.data || [])).catch(() => {});
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    const result = await dialog.logout();
    if (result.isConfirmed) {
      logout();
      notify.success('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <header className="erp-navbar fixed top-0 right-0 z-40 bg-white/90 dark:bg-erp-dark-card/90 backdrop-blur-sm border-b border-erp-border dark:border-erp-dark-border shadow-navbar transition-all duration-300" style={{ '--erp-navbar-left': `${collapsed ? 72 : 272}px` }}>
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 h-16 min-w-0">
        <button onClick={onToggleSidebar} className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Toggle sidebar"><HiOutlineMenuAlt2 className="w-5 h-5" /></button>
        <button onClick={onToggleMobile} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Open menu"><HiOutlineMenuAlt2 className="w-5 h-5" /></button>
        <div className="min-w-0 flex-1"><p className="font-semibold truncate text-sm sm:text-base">Teacher Portal</p><p className="hidden sm:block text-xs text-erp-muted truncate">{user?.name || user?.email || ''}</p></div>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>{isDark ? <HiOutlineSun className="w-5 h-5 text-amber-500" /> : <HiOutlineMoon className="w-5 h-5" />}</button>
          <div ref={notifRef} className="relative"><button onClick={() => setNotifOpen(v=>!v)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 relative"><HiOutlineBell className="w-5 h-5" />{notices.length>0&&<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"/>}</button><AnimatePresence>{notifOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-1.5rem))] bg-white dark:bg-erp-dark-card border rounded-xl shadow-lg z-50"><div className="px-4 py-3 border-b font-semibold text-sm">Notifications</div><div className="max-h-72 overflow-y-auto">{notices.length?notices.map(n=><div key={n._id} className="px-4 py-3 border-b last:border-0"><p className="text-sm font-medium">{n.title}</p><p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.message}</p></div>):<p className="p-4 text-sm text-slate-500">No notifications.</p>}</div></motion.div>}</AnimatePresence></div>
          <div ref={profileRef} className="relative"><button onClick={()=>setProfileOpen(v=>!v)} className="flex items-center gap-2 px-1.5 sm:px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"><Avatar src={user?.avatar} name={user?.name || 'Teacher'} size="sm"/><div className="hidden md:block text-left"><p className="text-sm font-semibold truncate max-w-[140px]">{user?.name}</p><p className="text-xs text-erp-muted capitalize">{user?.role}</p></div><HiOutlineChevronDown className="hidden sm:block w-3.5 h-3.5"/></button><AnimatePresence>{profileOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-erp-dark-card border rounded-xl shadow-lg z-50"><div className="px-4 py-3 border-b"><p className="font-semibold text-sm truncate">{user?.name}</p><p className="text-xs text-erp-muted truncate">{user?.email}</p></div><div className="py-1"><button onClick={()=>{navigate('/profile');setProfileOpen(false)}} className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center hover:bg-slate-50"><HiOutlineUser/>My Profile</button><button onClick={()=>{navigate('/settings');setProfileOpen(false)}} className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center hover:bg-slate-50"><HiOutlineCog/>Settings</button><button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-danger flex gap-2 items-center hover:bg-red-50"><HiOutlineLogout/>Logout</button></div></motion.div>}</AnimatePresence></div>
        </div>
      </div>
    </header>
  );
}
