module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    tittle: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
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