// =============================================
// Sidebar Navigation Menu for Teacher Panel
// =============================================
import {
  HiOutlineViewGridAdd,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineDocumentReport,
  HiOutlineBadgeCheck,
  HiOutlineAnnotation,
  HiOutlineBell,
  HiOutlineDownload,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineClock
} from 'react-icons/hi';

export const SIDEBAR_MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: HiOutlineViewGridAdd, path: '/' },
  { id: 'my-classes', label: 'My Classes', icon: HiOutlineUsers, path: '/my-classes' },
  { id: 'my-students', label: 'My Students', icon: HiOutlineUserGroup, path: '/my-students' },
  { id: 'attendance', label: 'Attendance', icon: HiOutlineClipboardList, path: '/attendance' },
  { id: 'homework', label: 'Homework', icon: HiOutlineDocumentText, path: '/homework' },
  { id: 'assignments', label: 'Assignments', icon: HiOutlineBookOpen, path: '/assignments' },
  { id: 'study-materials', label: 'Study Materials', icon: HiOutlineDocumentReport, path: '/study-materials' },
  { id: 'timetable', label: 'Timetable', icon: HiOutlineClock, path: '/timetable' },
  { id: 'examinations', label: 'Examinations', icon: HiOutlineAnnotation, path: '/examinations' },
  { id: 'marks-entry', label: 'Marks Entry', icon: HiOutlineBadgeCheck, path: '/marks-entry' },
  { id: 'results', label: 'Results', icon: HiOutlineDocumentReport, path: '/results' },
  { id: 'leave-management', label: 'Leave Management', icon: HiOutlineCalendar, path: '/leave-management' },
  { id: 'announcements', label: 'Announcements', icon: HiOutlineBell, path: '/announcements' },
  { id: 'calendar', label: 'Calendar', icon: HiOutlineCalendar, path: '/calendar' },
  { id: 'downloads', label: 'Downloads', icon: HiOutlineDownload, path: '/downloads' },
  { id: 'profile', label: 'Profile', icon: HiOutlineUser, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: HiOutlineCog, path: '/settings' },
];
