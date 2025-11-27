import React, { useEffect, useState } from 'react'

export default function StatusTracker({ apiBase }){
  const [stats, setStats] = useState({})

  async function load(){
    try{
      const r = await fetch(`${apiBase}/complaints`)
      const data = await r.json()
      const byStatus = data.reduce((acc, c)=>{ acc[c.status] = (acc[c.status]||0)+1; return acc }, {})
      setStats(byStatus)
    }catch(err){ console.error(err) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div>
      <h2>Status Tracker</h2>
      <div className="stats">
        {Object.keys(stats).length === 0 && <div>No data</div>}
        {Object.entries(stats).map(([k,v]) => (
          <div key={k} className="stat">
            <strong>{k}</strong>: {v}
          </div>
        ))}
      </div>
    </div>
  )
}
