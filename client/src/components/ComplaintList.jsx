import React, { useEffect, useState } from 'react'

export default function ComplaintList({ apiBase, openDetails }){
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    try{
      const r = await fetch(`${apiBase}/complaints`)
      const data = await r.json()
      setComplaints(data)
    }catch(err){ console.error(err) }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div>
      <h2>Complaints</h2>
      {loading && <div>Loading...</div>}
      {!loading && complaints.length === 0 && <div>No complaints yet.</div>}
      <ul className="list">
        {complaints.map(c => (
          <li key={c.id} className="card">
            <div className="card-title">{c.title}</div>
            <div className="card-meta">{new Date(c.created_at).toLocaleString()} • {c.status}</div>
            <div className="card-actions">
              <button onClick={() => openDetails(c.id)}>Details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
