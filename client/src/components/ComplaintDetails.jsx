import React, { useEffect, useState } from 'react'

export default function ComplaintDetails({ apiBase, id, onClose }){
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function load(){
    if(!id){ setComplaint(null); setLoading(false); return }
    setLoading(true)
    try{
      const r = await fetch(`${apiBase}/complaints/${id}`)
      const data = await r.json()
      setComplaint(data)
    }catch(err){ console.error(err) }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [id])

  async function updateStatus(newStatus){
    setSaving(true)
    try{
      await fetch(`${apiBase}/complaints/${id}`, { method: 'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status: newStatus }) })
      await load()
    }catch(err){ console.error(err); alert('failed') }
    setSaving(false)
  }

  async function remove(){
    if(!confirm('Delete complaint?')) return
    try{
      await fetch(`${apiBase}/complaints/${id}`, { method: 'DELETE' })
      if(onClose) onClose()
    }catch(err){ console.error(err); alert('failed') }
  }

  if(loading) return <div>Loading...</div>
  if(!complaint) return <div>No complaint selected.</div>

  return (
    <div>
      <h2>{complaint.title}</h2>
      <div className="meta">{new Date(complaint.created_at).toLocaleString()} • {complaint.status}</div>
      <p>{complaint.description}</p>

      <div className="actions">
        <button onClick={()=>updateStatus('open')} disabled={saving}>Mark Open</button>
        <button onClick={()=>updateStatus('in_progress')} disabled={saving}>In Progress</button>
        <button onClick={()=>updateStatus('resolved')} disabled={saving}>Resolve</button>
        <button onClick={remove} className="danger">Delete</button>
        <button onClick={onClose}>Back</button>
      </div>
    </div>
  )
}
