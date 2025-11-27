import React, { useEffect, useState } from 'react'

export default function Analytics({ apiBase }){
  const [summary, setSummary] = useState(null)

  async function load(){
    try{
      const r = await fetch(`${apiBase}/complaints/analytics/summary`)
      const data = await r.json()
      setSummary(data)
    }catch(err){ console.error(err) }
  }

  useEffect(()=>{ load() }, [])

  if(!summary) return <div>Loading analytics...</div>

  const maxStatus = Math.max(...(summary.byStatus.map(s=>s.count)||[1]))

  return (
    <div>
      <h2>Analytics</h2>
      <h3>By Status</h3>
      <div className="analytics">
        {summary.byStatus.map(s => (
          <div key={s.status} className="bar-row">
            <div className="label">{s.status} ({s.count})</div>
            <div className="bar" style={{ width: `${(s.count/maxStatus)*100}%` }} />
          </div>
        ))}
      </div>

      <h3>Per Day (last 14)</h3>
      <ul>
        {summary.perDay.map(d => (
          <li key={d.date}>{d.date}: {d.count}</li>
        ))}
      </ul>
    </div>
  )
}
