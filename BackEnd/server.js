require('dotenv').config()                                  
const app = require('./src/app')


// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  }