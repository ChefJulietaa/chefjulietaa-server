const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Recipe = require("../models/Recipe.model");

// const Ingredient = require('../models/Ingredient.model');

//  POST /api/recipes  -  Creates a new recipe
router.post("/", isAuthenticated, (req, res) => {
  const recipe = req.body;
  Recipe.create(recipe)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating new recipe", err);
      res.status(500).json(err);
    });
});

// GET /api/recipes -  Retrieves all of the recipes Read
router.get("/", (req, res) => {
  Recipe.find()
    .populate("ingredients.ingredient")
    .populate("author")
    .then((allRecipes) => res.json(allRecipes))
    .catch((err) => {
      console.log("error getting recipes from DB", err);
      res.status(500).json(err);
    });
});

//  GET /api/recipes/:recipeId -  Retrieves a specific recipe by id
router.get("/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Recipe.findById(recipeId)
    .populate("ingredients.ingredient")
    .then((recipe) => res.json(recipe))
    .catch((err) => {
      console.log("error getting recipe details from DB", err);
      res.status(500).json(err);
    });
});

// PUT  /api/recipes/:recipeId  -  Updates a specific recipe by id
router.put("/:recipeId", isAuthenticated, (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((err) => {
      console.log("error updating recipe", err);
      res.status(500).json(err);
    });
});

// DELETE  /api/recipes/:recipeId  -  Deletes a specific recipe by id
router.delete("/:recipeId", isAuthenticated, (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Recipe.findByIdAndRemove(recipeId)
    .then(() =>
      res.json({ message: `Recipe with ${recipeId} is removed successfully.` })
    )
    .catch((err) => {
      console.log("error deleting recipe", err);
      res.status(500).json(err);
    });
});

module.exports = router;
