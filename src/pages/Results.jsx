import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';
export default function Results(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/results',{params:{limit:500}}).then(({data})=>setItems(data.data||[])).catch(e=>notify.error(e.message));},[]);return <><Helmet><title>Results — Teacher Panel</title></Helmet><PageHeader title="Results" subtitle="Results entered for your school scope."/><Card className="overflow-x-auto"><table className="w-full min-w-[720px]"><thead><tr className="bg-slate-50 text-left text-xs text-slate-500"><th className="p-4">Student</th><th className="p-4">Exam</th><th className="p-4">Marks</th><th className="p-4">Grade</th><th className="p-4">Remarks</th></tr></thead><tbody>{items.map(x=><tr key={x._id} className="border-t border-slate-100"><td className="p-4">{x.student?.user?.name || 'Student'}</td><td className="p-4">{x.exam?.name || 'Exam'}</td><td className="p-4">{x.marksObtained}</td><td className="p-4">{x.grade || '—'}</td><td className="p-4">{x.remarks || '—'}</td></tr>)}</tbody></table>{!items.length&&<div className="p-8 text-center text-slate-500">No results found.</div>}</Card></>}
