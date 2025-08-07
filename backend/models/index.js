"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.resolve(__dirname, "../config/config.json"))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Ruta absoluta a la carpeta 'app'
const appPath = path.resolve(__dirname, "../app");

// Leemos las carpetas dentro de 'app'
fs.readdirSync(appPath).forEach((moduleFolder) => {
  const modelsPath = path.join(appPath, moduleFolder, "models");

  if (fs.existsSync(modelsPath) && fs.statSync(modelsPath).isDirectory()) {
    fs.readdirSync(modelsPath).forEach((file) => {
      if (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js"
      ) {
        const modelPath = path.join(modelsPath, file);
        const model = require(modelPath)(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      }
    });
  }
});

// Ejecutar asociaciones si existen
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
