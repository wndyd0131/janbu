const { Router } = require('express');
const recipeRouter = Router();

recipeRouter.get('/', (req, res) => {
  res.send("<h1>Recipe</h1>");
});

recipeRouter.post('/', (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    materials: [{name: req.body.materials}],
    content: req.body.content,
    rating: req.body.rating,
    reviews: req.body.reviews
  });
  recipe.save();
  res.send("ok");
})

module.exports = { recipeRouter };
