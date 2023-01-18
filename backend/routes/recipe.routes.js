module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");
    const auth = require("../controllers/auth.js");
    const upload = require('../multer/upload');

    var router = require("express").Router();

    // Create a new recipe
    router.post("/", upload.single('file'), auth.isAuthenticated, recipes.create);

    // Retrieve all recipes
    router.get("/", auth.isAuthenticated, recipes.findAll);

    // Retrieve a single recipe with id
    router.get("/:id", auth.isAuthenticated, recipes.findOne);

    // Retrieve all recipes equals an id
    router.get("/user/:id", auth.isAuthenticated, recipes.findAllByUserId);

    // Update a recipe with id
    router.put("/:id", upload.single('file'), recipes.update);

    // Delete a recipe with id
    router.delete("/:id", auth.isAuthenticated, recipes.delete);

    app.use('/api/recipes', router);
};