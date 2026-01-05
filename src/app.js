const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

// middlesware
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// welcome routes
app.use('/api/v1', require('./routes/index'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
