const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    title: String,
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ingredient = model("Ingredient", IngredientSchema);

module.exports = Ingredient;
