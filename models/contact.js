module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW,
    },
  });

  return Contact;
};
