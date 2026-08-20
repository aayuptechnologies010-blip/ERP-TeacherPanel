import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { Loader } from '../components/ui/Loader';
import { PrivateRoute, PublicRoute } from './guards';

// Lazy loading pages for better performance and to show the loader
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const MyClasses = lazy(() => import('../pages/MyClasses'));
const MyStudents = lazy(() => import('../pages/MyStudents'));
const Attendance = lazy(() => import('../pages/Attendance'));
const Homework = lazy(() => import('../pages/Homework'));
const Assignments = lazy(() => import('../pages/Assignments'));
const StudyMaterials = lazy(() => import('../pages/StudyMaterials'));
const Timetable = lazy(() => import('../pages/Timetable'));
const Examinations = lazy(() => import('../pages/Examinations'));
const MarksEntry = lazy(() => import('../pages/MarksEntry'));
const Results = lazy(() => import('../pages/Results'));
const LeaveManagement = lazy(() => import('../pages/LeaveManagement'));
const Announcements = lazy(() => import('../pages/Announcements'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Downloads = lazy(() => import('../pages/Downloads'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

const withSuspense = (Component) => (
  <Suspense fallback={<Loader fullScreen={false} />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '', element: withSuspense(Dashboard) },
          { path: 'my-classes', element: withSuspense(MyClasses) },
          { path: 'my-students', element: withSuspense(MyStudents) },
          { path: 'attendance', element: withSuspense(Attendance) },
          { path: 'homework', element: withSuspense(Homework) },
          { path: 'assignments', element: withSuspense(Assignments) },
          { path: 'study-materials', element: withSuspense(StudyMaterials) },
          { path: 'timetable', element: withSuspense(Timetable) },
          { path: 'examinations', element: withSuspense(Examinations) },
          { path: 'marks-entry', element: withSuspense(MarksEntry) },
          { path: 'results', element: withSuspense(Results) },
          { path: 'leave-management', element: withSuspense(LeaveManagement) },
          { path: 'announcements', element: withSuspense(Announcements) },
          { path: 'calendar', element: withSuspense(Calendar) },
          { path: 'downloads', element: withSuspense(Downloads) },
          { path: 'profile', element: withSuspense(Profile) },
          { path: 'settings', element: withSuspense(Settings) },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <AuthLayout />,
        children: [
          { path: '', element: <Suspense fallback={<Loader fullScreen={true} />}><Login /></Suspense> },
        ],
      },
      { path: '/forgot-password', element: <Suspense fallback={<Loader fullScreen={true} />}><ForgotPasswordPage /></Suspense> },
      { path: '/reset-password/:token', element: <Suspense fallback={<Loader fullScreen={true} />}><ResetPasswordPage /></Suspense> },
    ],
  },
  { path: '*', element: withSuspense(NotFound) },
]);

export default router;
