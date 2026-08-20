import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui';
import api from '../api/api';
import { notify } from '../utils/notify';
export default function Calendar(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/events',{params:{limit:100}}).then(({data})=>setItems(data.data||[])).catch(e=>notify.error(e.message));},[]);return <><Helmet><title>Academic Calendar — Teacher Panel</title></Helmet><PageHeader title="Academic Calendar" subtitle="School events and academic dates."/><div className="space-y-3">{items.map(x=><Card key={x._id} className="p-5"><div className="flex flex-col sm:flex-row sm:justify-between gap-2"><h3 className="font-bold">{x.title}</h3><span className="text-sm text-primary">{new Date(x.date).toLocaleDateString('en-IN')}</span></div>{x.location&&<p className="text-xs text-slate-500 mt-1">{x.location}</p>}{x.description&&<p className="text-sm text-slate-600 mt-2">{x.description}</p>}</Card>)}{!items.length&&<Card className="p-8 text-center text-slate-500">No calendar events found.</Card>}</div></>}
