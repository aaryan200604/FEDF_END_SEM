const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const complaints = require('./routes/complaints');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/complaints', complaints);

app.get('/', (req, res) => res.json({ ok: true, message: 'Smart City Complaints API' }));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
