module.exports = app => {
    const recipe_ingredients = require("../controllers/recipeIngredient.controller.js");
    const auth = require("../controllers/auth.js");
  //  const upload = require('../multer/upload');

    var router = require("express").Router();

    // Create a new recipe_ingredients
    router.post("/", recipe_ingredients.create);

    // Retrieve all recipes_ingredients
    router.get("/", auth.isAuthenticated, recipe_ingredients.findAll);

    // Retrieve a single recipe_ingredients with id
    router.get("/:id", auth.isAuthenticated, recipe_ingredients.findOne);

    // Retrieve all recipes_ingredients equals an id from recipe
    router.get("/recipe/:id", auth.isAuthenticated, recipe_ingredients.findAllByUserId);

    // Update a recipe_ingredients with id
    router.put("/:id", recipe_ingredients.update);

    // Delete a recipe_ingredients with id
    router.delete("/:id", auth.isAuthenticated, recipe_ingredients.delete);

    app.use('/api/recipeIngredients', router);
};