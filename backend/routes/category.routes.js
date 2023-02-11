module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();


    // Retrieve all recipes
    router.get("/", auth.isAuthenticated, categories.findAll);

    
    // Retrieve a single Category with id
    router.get("/:id", auth.isAuthenticated, categories.findOne);






    app.use('/api/categories', router);
};