import React, { useState } from 'react'

export default function AddComplaint({ apiBase, onDone }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit(e){
    e.preventDefault()
    if(!title) return alert('title required')
    setSaving(true)
    try{
      await fetch(`${apiBase}/complaints`, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, description }) })
      setTitle(''); setDescription('')
      if(onDone) onDone()
    }catch(err){ console.error(err); alert('failed') }
    setSaving(false)
  }

  return (
    <div>
      <h2>Add Complaint</h2>
      <form onSubmit={submit} className="form">
        <label>Title
          <input value={title} onChange={e=>setTitle(e.target.value)} />
        </label>
        <label>Description
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        </label>
        <div>
          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
        </div>
      </form>
    </div>
  )
}
