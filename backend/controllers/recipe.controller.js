const db = require("../models");
const Recipe = db.recipe;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe
    const recipe = {
      //  id: req.body.id,
        userId: req.body.userId,
        tittle: req.body.tittle,
        category: req.body.category,
        filename: req.file ? req.file.filename : ""
    };

    // Save Recipe in the database
    Recipe.create(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Recipe."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Recipe.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Recipe.findAll({ where: { userId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + id
            });
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const recipe = {
        tittle: req.body.tittle,
        category: req.body.category,
        filename: req.file ? req.file.filename : "",
        userId: req.body.userId,
      };

    Recipe.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe with id=" + id
            });
        });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe with id=" + id
            });
        });
};