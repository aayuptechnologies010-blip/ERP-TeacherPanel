import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';
const csv = (rows) => rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
export default function Downloads(){const [students,setStudents]=useState([]);useEffect(()=>{api.get('/teachers/my-students',{params:{limit:500}}).then(({data})=>setStudents(data.data||[])).catch(e=>notify.error(e.message));},[]);const download=()=>{const text=csv([['Name','Email','Class','Section','Roll No','Status'],...students.map(s=>[s.user?.name,s.user?.email,s.class,s.section,s.rollNo,s.status])]);const blob=new Blob([text],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-students.csv';a.click();URL.revokeObjectURL(url);};return <><Helmet><title>Downloads — Teacher Panel</title></Helmet><PageHeader title="Downloads & Reports" subtitle="Export data available to your teacher account."/><Card className="p-5"><button onClick={download} className="w-full sm:w-auto btn btn-outline">Download My Students CSV</button></Card></>}
