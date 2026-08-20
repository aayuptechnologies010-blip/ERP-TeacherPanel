import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';
import { useAuth } from '../context/AuthContext';

export default function Timetable() {
  const { user } = useAuth(); const [teacher, setTeacher] = useState(null); const [periods, setPeriods] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const profile = await api.get('/teachers/me'); setTeacher(profile.data.data); const id = profile.data.data?._id; if (id) { const { data } = await api.get(`/timetable/teacher/${id}`); setPeriods(data.data || []); } } catch (e) { notify.error(e.message); } finally { setLoading(false); } })(); }, []);
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return <><Helmet><title>Timetable — Teacher Panel</title></Helmet><PageHeader title="My Timetable" subtitle={teacher?.user?.name || user?.name || 'Teacher'} />{loading ? <Card className="p-8 text-center">Loading timetable...</Card> : <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto"><table className="w-full min-w-[900px] text-center"><thead><tr className="bg-slate-50"><th className="p-3">Period</th>{days.map((d) => <th key={d} className="p-3">{d}</th>)}</tr></thead><tbody>{Array.from({ length: 8 }, (_, i) => i + 1).map((n) => <tr key={n} className="border-t border-slate-100"><td className="p-3 font-medium">{n}</td>{days.map((day) => { const p = periods.find((x) => x.day === day && x.periodNo === n); return <td key={day} className="p-2">{p ? <div className="bg-blue-50 text-primary rounded-lg p-2 text-xs sm:text-sm"><b>{p.subject}</b><div>{p.class}-{p.section}</div>{p.startTime && <div>{p.startTime}{p.endTime ? ` - ${p.endTime}` : ''}</div>}</div> : <span className="text-slate-300">—</span>}</td>; })}</tr>)}</tbody></table>{!periods.length && <div className="p-8 text-center text-slate-500">No timetable has been assigned yet.</div>}</div>}</>;
}
