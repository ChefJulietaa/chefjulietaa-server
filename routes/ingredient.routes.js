const router = require("express").Router();

const Ingredient = require('../models/Ingredient.model');
const Recipe = require('../models/Recipe.model');

//  POST /api/ingredients  -  Creates a new ingredient
router.post('/', (req, res) => {
  const ingredient = req.body;
  Ingredient.create(ingredient)
      .then(response => res.json(response))
      .catch(err => {
          console.log("error creating new ingredient", err);
          res.status(500).json(err)
      });
});

//return all ingredients, Read
router.get('/', (req, res, next) => {
  Ingredient.find()
  .then(ingredients=> {
    res.send(ingredients)
  })
});


module.exports = router;
