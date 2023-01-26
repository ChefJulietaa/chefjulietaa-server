const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema({
  ingredients: [{
    ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
    amount: Number,
  }],
  title: String,
  imageUrl: String,
  description: String,
  author: String,
  totalTime: Number,
  servings: Number,
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
});

module.exports = model("Recipe", recipeSchema);


//different ingredients will be used in different recipes and in different proportions(array of objects)

