const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;
//const utils = require("../utils");
//const bcrypt = require('bcryptjs');



// Find a silgle Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
    .then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No se encuentra la categoría con id=${id}.`,
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error al recuperar Category con id=" + id,
        });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    Category.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };