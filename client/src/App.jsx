import React, { useState } from 'react'
import Navbar from './components/Navbar'
import ComplaintList from './components/ComplaintList'
import AddComplaint from './components/AddComplaint'
import ComplaintDetails from './components/ComplaintDetails'
import StatusTracker from './components/StatusTracker'
import Analytics from './components/Analytics'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000'

export default function App(){
  const [view, setView] = useState('list')
  const [selectedId, setSelectedId] = useState(null)

  const openDetails = (id) => { setSelectedId(id); setView('details'); }

  return (
    <div className="app-root">
      <Navbar onNavigate={setView} />

      <div className="container">
        {view === 'list' && <ComplaintList apiBase={API_BASE} openDetails={openDetails} />}
        {view === 'add' && <AddComplaint apiBase={API_BASE} onDone={() => setView('list')} />}
        {view === 'details' && <ComplaintDetails apiBase={API_BASE} id={selectedId} onClose={() => setView('list')} />}
        {view === 'status' && <StatusTracker apiBase={API_BASE} />}
        {view === 'analytics' && <Analytics apiBase={API_BASE} />}
      </div>
    </div>
  )
}
