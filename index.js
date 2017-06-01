const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(helmet())

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

require('./app/routes')(app)

app.listen(process.env.PORT || 8080)