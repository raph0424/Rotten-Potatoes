const express = require('express');
const methodOverride = require('method-override')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
app.listen(port);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

const reviews = require('./controllers/reviews')(app);

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

module.exports = app;
