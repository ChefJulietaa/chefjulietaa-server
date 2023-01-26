const { Schema, model } = require("mongoose");

const IngredientSchema = new Schema({
    title: String,
  },
  {
    timestamps: true, // this second object adds extra properties: `createdAt` and `updatedAt`
  }
);
const Ingredient = model("Ingredient", IngredientSchema);
module.exports = Ingredient;