import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card, Avatar, StatusChip } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/teachers/my-students', { params: { limit: 500 } }).then(({ data }) => setStudents(data.data || [])).catch((error) => notify.error(error.message)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => students.filter((s) => `${s.user?.name || ''} ${s.rollNo || ''} ${s.class || ''} ${s.section || ''}`.toLowerCase().includes(search.toLowerCase())), [students, search]);
  return <><Helmet><title>My Students — Teacher Panel</title></Helmet><PageHeader title="My Students" subtitle={`${filtered.length} students in your school scope`} /><Card className="p-4 mb-5"><input className="form-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." /></Card>{loading ? <Card className="p-8 text-center">Loading students...</Card> : <div className="overflow-x-auto bg-white rounded-xl border border-slate-100"><table className="w-full min-w-[760px]"><thead><tr className="bg-slate-50 text-left text-xs text-slate-500"><th className="p-4">Student</th><th className="p-4">Class</th><th className="p-4">Roll No</th><th className="p-4">Status</th></tr></thead><tbody>{filtered.map((s) => <tr key={s._id} className="border-t border-slate-100"><td className="p-4"><div className="flex items-center gap-3"><Avatar src={s.user?.avatar} name={s.user?.name} size="sm" /><div><p className="font-medium">{s.user?.name || 'Student'}</p><p className="text-xs text-slate-500">{s.user?.email || ''}</p></div></div></td><td className="p-4">{s.class} {s.section ? `- ${s.section}` : ''}</td><td className="p-4">{s.rollNo}</td><td className="p-4"><StatusChip status={s.status || 'active'} /></td></tr>)}</tbody></table>{!filtered.length && <div className="p-8 text-center text-slate-500">No students found.</div>}</div>}</>;
}
