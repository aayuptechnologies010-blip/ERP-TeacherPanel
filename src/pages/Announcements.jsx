import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';
export default function Announcements(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/notices',{params:{limit:100}}).then(({data})=>setItems(data.data||[])).catch(e=>notify.error(e.message));},[]);return <><Helmet><title>Announcements — Teacher Panel</title></Helmet><PageHeader title="Announcements" subtitle="School announcements available to teachers."/>{items.length===0?<Card className="p-8 text-center text-slate-500">No announcements found.</Card>:<div className="space-y-4">{items.map(x=><Card key={x._id} className="p-5 border-l-4 border-l-primary"><h3 className="font-bold text-lg">{x.title}</h3><p className="text-xs text-primary mt-1">{new Date(x.createdAt).toLocaleString('en-IN')}</p><p className="text-sm text-slate-600 mt-3 whitespace-pre-wrap">{x.message}</p></Card>)}</div>}</>}
