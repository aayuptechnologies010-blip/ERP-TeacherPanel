import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdPeople, MdArrowForward } from 'react-icons/md';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';

export default function MyClasses() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/teachers/me');
        const teacher = data.data;
        setProfile(teacher);
        const timetable = await api.get(`/timetable/teacher/${teacher?._id}`);
        const unique = new Map();
        (timetable.data.data || []).forEach((row) => {
          const key = `${row.class}-${row.section}`;
          unique.set(key, { _id: key, name: row.class, class: row.class, section: row.section, subject: row.subject });
        });
        setProfile({ ...teacher, resolvedClasses: [...unique.values()] });
      } catch (error) {
        notify.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const classes = profile?.resolvedClasses || profile?.classesAssigned || [];
  return (
    <>
      <Helmet><title>My Classes — Teacher Panel</title></Helmet>
      <PageHeader title="My Classes" subtitle="Classes assigned to your teacher profile." />
      {loading ? <Card className="p-8 text-center">Loading classes...</Card> : classes.length === 0 ? <Card className="p-8 text-center text-slate-500">No classes have been assigned to you yet.</Card> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{classes.map((cls, index) => { const value = typeof cls === 'object' ? cls : { _id: cls }; return <Card key={value._id || index} className="p-5 sm:p-6"><div className="flex justify-between items-start gap-3"><div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">{value.class || value.grade || index + 1}</div><span className="text-xs text-slate-500">{value.section || ''}</span></div><h3 className="text-lg font-bold mt-4">{value.name || value.class || 'Assigned Class'}</h3><div className="flex items-center text-slate-500 text-sm mt-3"><MdPeople className="mr-2" /> Class assignment</div><button className="w-full mt-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium flex items-center justify-center">View Details <MdArrowForward className="ml-2" /></button></Card>; })}</div>}
    </>
  );
}
