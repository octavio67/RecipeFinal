module.exports = (sequelize, Sequelize) => {
  const Recipe_ingredient = sequelize.define("recipe_ingredient", {
    unit: {
      type: Sequelize.STRING
    },
    measure: {
      type: Sequelize.STRING
    },
    ingredient: {
      type: Sequelize.STRING
    },
    recipeId: {
      type: Sequelize.INTEGER
    },
  },
  { timestamps: false }
  );

  Recipe_ingredient.associate = function(models) {
    Recipe_ingredient.belongsTo(models.recipe, {
      onDelete: "CASCADE",
      foreignKey: "recipeId",
      as: "recipeId_ingredient",
    })
  }

  return Recipe_ingredient;
};