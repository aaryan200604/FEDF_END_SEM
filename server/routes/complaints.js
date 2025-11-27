const express = require('express');
const router = express.Router();
const { db, run, all, get } = require('../db');

function nowISO(){ return new Date().toISOString(); }

// List complaints
router.get('/', async (req, res) => {
  try{
    const rows = await all('SELECT * FROM complaints ORDER BY created_at DESC');
    res.json(rows);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Get one
router.get('/:id', async (req, res) => {
  try{
    const row = await get('SELECT * FROM complaints WHERE id = ?', [req.params.id]);
    if(!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Create
router.post('/', async (req, res) => {
  try{
    const { title, description } = req.body;
    if(!title) return res.status(400).json({ error: 'title required' });
    const created = nowISO();
    const result = await run('INSERT INTO complaints (title, description, status, created_at, updated_at) VALUES (?,?,?,?,?)', [title, description||'', 'open', created, created]);
    const id = result.lastID;
    const newRow = await get('SELECT * FROM complaints WHERE id = ?', [id]);
    res.status(201).json(newRow);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Patch (partial update)
router.patch('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const allowed = ['title','description','status'];
    const fields = [];
    const params = [];
    for(const k of allowed){ if(req.body[k] !== undefined){ fields.push(`${k} = ?`); params.push(req.body[k]); }}
    if(fields.length === 0) return res.status(400).json({ error: 'no fields to update' });
    params.push(new Date().toISOString());
    params.push(id);
    const sql = `UPDATE complaints SET ${fields.join(', ')}, updated_at = ? WHERE id = ?`;
    await run(sql, params);
    const updated = await get('SELECT * FROM complaints WHERE id = ?', [id]);
    res.json(updated);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Delete
router.delete('/:id', async (req, res) => {
  try{
    await run('DELETE FROM complaints WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Analytics
router.get('/analytics/summary', async (req, res) => {
  try{
    const byStatus = await all(`SELECT status, COUNT(*) as count FROM complaints GROUP BY status`);
    const perDay = await all(`
      SELECT substr(created_at,1,10) as date, COUNT(*) as count
      FROM complaints
      GROUP BY date
      ORDER BY date DESC
      LIMIT 14
    `);
    res.json({ byStatus, perDay });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

module.exports = router;
