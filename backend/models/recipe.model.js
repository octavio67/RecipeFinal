module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    tittle: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    filename: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
  },
  { timestamps: false }
  );

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    })
  }

  return Recipe;
};