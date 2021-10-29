const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 5000

app.use(compression())
app.use('/', express.static(path.join(__dirname, 'dist')))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`server started on ${PORT}`))
