const db = require("../models");
const Recipe_ingredient = db.recipe_ingredient;
const Op = db.Sequelize.Op;


// Create and Save a new Recipe_ingredients
exports.create = (req, res) => {
    // Validate request
    if (!req.body.unit || !req.body.measure) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe_ingredient
    const recipe_ingredient = {
      //  id: req.body.id,
        unit: req.body.unit,
        measure: req.body.measure,
        ingredient: req.body.ingredient,
        recipeId: req.body.recipeId,
    };

    // Save Recipe_ingredients in the database
    Recipe_ingredient.create(recipe_ingredient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Recipe_ingredient."
            });
        });
};


// Retrieve all Recipes_ingredients from the database.
exports.findAll = (req, res) => {
    Recipe_ingredient.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes_ingredients."
            });
        });
};


// Retrieve all Recipes_ingredients from the database by recipe.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Recipe_ingredient.findAll({ where: { RecipeId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes_ingredients."
            });
        });
};


// Find a single Recipe_ingredients with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe_ingredient.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encuentra la receta con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al recuperar Receta con id=" + id,
      });
    });
};


// Update a Recipe_ingredients by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const recipe_ingredient = {
        unit: req.body.unit,
        measure: req.body.measure,
        ingredient: req.body.ingredient,
        recipeId: req.body.recipeId,
      };

    Recipe_ingredient.update(recipe_ingredient, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe_ingredients was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recipe_ingredients with id=${id}. Maybe Recipe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe_ingredients with id=" + id
            });
        });
};

// Delete a Recipe_ingredients with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe_ingredient.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe_ingredients was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recipe_ingredients with id=${id}. Maybe Recipe_ingredients was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe_ingredients with id=" + id
            });
        });
};