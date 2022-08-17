const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { recipeRouter } = require('./routes/recipeRoute');

const port = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/recipe', recipeRouter);

mongoose.connect("mongodb://localhost:27017/janbuDB", () => {
  console.log("Successfully connected to mongodb.")
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  }
})

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  materials: {
    type: Array,
    required: true,
  },
  content: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: String,
})

const Recipe = mongoose.model("Recipe", recipeSchema);

app.route('/')
.get((req, res) => {
  res.send("<h1>Hello</h1>");
});



app.route('/exchange')
.get((req, res) => {
  res.send("<h1>Exchange</h1>");
})

app.route('/api/recipe')
.get((req, res) => {
  Recipe.find((err, recipes) => {
    if(!err){
      res.json(recipes);
    }else{
      res.send(err);
    }
  });
})


app.listen(port, () => {console.log(`Server is running on port ${port}`)});