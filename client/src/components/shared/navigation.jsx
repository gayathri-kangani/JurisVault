import { MdDashboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { FaSlideshare, FaHistory, FaRegUserCircle, FaTasks, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdSettings, IoIosHelpCircleOutline } from "react-icons/io";
import { HiOutlineLogout } from 'react-icons/hi';
import { LuFileSearch } from "react-icons/lu";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
	  key: 'dashboard',
	  label: 'Dashboard',
	  path: '/',
	  icon: <MdDashboard />,
	  roles: ['lawyer', 'client', 'judge'] // All roles can access Dashboard
	},
	{
	  key: 'profile',
	  label: 'Profile',
	  path: '/profile',
	  icon: <FaRegUserCircle/>,
	  roles: ['lawyer', 'client', 'judge'] // All roles can access Profile
	},
	{
	  key: 'documents',
	  label: 'Documents',
	  path: '/myFiles',
	  icon: <IoDocuments />,
	  roles: ['lawyer', 'client'] // Lawyers and clients can access Documents
	},
	{
	  key: 'share ',
	  label: 'Share Access',
	  path: '/share',
	  icon: <FaSlideshare />,
	  roles: ['lawyer', 'client'] // Lawyers and clients can access Share Access
	},
	{
	  key: 'history',
	  label: 'History',
	  path: '/history',
	  icon: <FaHistory />,
	  roles: ['lawyer', 'judge'] // Lawyers and judges can access History
	},
	{
	  key: 'files',
	  label: 'Files',
	  path: '/files',
	  icon: <LuFileSearch />,
	  roles: ['lawyer', 'judge'] // Lawyers and judges can access Files
	},
	{
	  key: 'calendar',
	  label: 'Calendar',
	  path: '/calendar',
	  icon: <FaRegCalendarAlt />,
	  roles: ['lawyer', 'client', 'judge'] // All roles can access Calendar
	},
	{
	  key: 'tasks',
	  label: 'Tasks',
	  path: '/tasks',
	  icon: <FaTasks />,
	  roles: ['lawyer', 'client', 'judge'] // All roles can access Tasks
	}
  ];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <IoIosHelpCircleOutline />
	},
	{
		key: 'logout',
		label: 'Logout',
		path: '/logout',
		icon: <HiOutlineLogout />
	}
]