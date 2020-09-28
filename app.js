const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));


// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
// ]
  


const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
  });
  // INDEX
  app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
        console.log(err);
      })
  })
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  })
// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
  })
  // NEW

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');