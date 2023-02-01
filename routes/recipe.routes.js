const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

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

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
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
    .populate("author")
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
