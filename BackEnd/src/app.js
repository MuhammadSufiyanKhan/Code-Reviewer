const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

const app = express()

app.use(cors(
    {
        origin: ['https://code-reviewer-ten.vercel.app/', 'http://localhost:5173'], // Add your frontend URLs
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
    }
))
app.options('*', cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!') 
})

app.use('/ai', aiRoutes)

// For local development
if (require.main === module) {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')
    })
  }


module.exports = app
