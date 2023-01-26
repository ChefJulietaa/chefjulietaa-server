const express = require("express");
const router = express.Router();

router.use("/ingredients", require("./ingredient.routes"));
router.use("/recipes", require("./recipe.routes"));

module.exports = router;