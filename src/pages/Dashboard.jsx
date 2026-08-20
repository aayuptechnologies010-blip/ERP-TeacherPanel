import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdClass, MdPeople, MdFactCheck, MdAssignment } from 'react-icons/md';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { notify } from '../utils/notify';

const formatDate = (value) => new Date(value).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ classesAssigned: 0, pendingLeaves: 0, upcomingEvents: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get('/dashboard/teacher')
      .then(({ data: response }) => active && setData(response.data || {}))
      .catch((error) => active && notify.error(error.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <>
      <Helmet><title>Dashboard — EduERP Teacher</title></Helmet>
      <PageHeader title={`Welcome back, ${user?.name || 'Teacher'}! 👋`} subtitle="Your teaching overview and school activities." />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-slate-500">Today&apos;s overview</p>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 w-fit">{formatDate(new Date())}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Assigned Classes" value={loading ? '—' : data.classesAssigned || 0} icon={MdClass} color="primary" />
        <StatCard title="Pending Leave Requests" value={loading ? '—' : data.pendingLeaves || 0} icon={MdPeople} color="warning" />
        <StatCard title="Upcoming Events" value={loading ? '—' : (data.upcomingEvents || []).length} icon={MdFactCheck} color="secondary" />
        <StatCard title="Teacher Portal" value="Active" icon={MdAssignment} color="success" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-5 sm:p-6">
          <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
          {(data.upcomingEvents || []).length === 0 ? (
            <p className="text-sm text-slate-500">No upcoming events.</p>
          ) : (
            <div className="space-y-3">
              {data.upcomingEvents.map((event) => (
                <div key={event._id} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <span className="text-xs text-primary">{new Date(event.date).toLocaleDateString('en-IN')}</span>
                  </div>
                  {event.location && <p className="text-xs text-slate-500 mt-1">{event.location}</p>}
                  {event.description && <p className="text-sm text-slate-500 mt-2">{event.description}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-5 sm:p-6">
          <h3 className="text-lg font-bold mb-4">Account</h3>
          <p className="text-sm text-slate-500">Signed in as <b className="text-slate-700">{user?.email}</b>.</p>
          <p className="text-sm text-slate-500 mt-2">Your data is loaded from the school account associated with your teacher profile.</p>
        </Card>
      </div>
    </>
  );
}
