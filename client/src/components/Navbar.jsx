import React from 'react'

export default function Navbar({ onNavigate }){
  return (
    <nav className="nav">
      <div className="brand">Smart City Complaints</div>
      <div className="links">
        <button onClick={() => onNavigate('list')}>List</button>
        <button onClick={() => onNavigate('add')}>Add</button>
        <button onClick={() => onNavigate('status')}>Status</button>
        <button onClick={() => onNavigate('analytics')}>Analytics</button>
      </div>
    </nav>
  )
}
