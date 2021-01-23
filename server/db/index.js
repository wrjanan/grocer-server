const fs = require("fs");
const sqlite3 = require("sqlite3");
const sqliteAsync = require('sqlite-async');
const {createTables, populateTables} = require("./schema");
const { Sequelize } = require('sequelize');

// Constant
const dbFile = "./sqlite.db";

// Drop our database
const dropDatabase = () => {

  // Force re-creation of the database file
  fs.unlinkSync(dbFile);
};

// Setup our sqlite database
const setupDatabase = async () => {
  
  // Check if the DB exists before we try to open it
  // since that will auto-create it
  const databaseDidExist = fs.existsSync(dbFile);
  
  // Open or create our database now
  const db = await sqliteAsync.open(dbFile);
  
  // If not, let's fill it in
  if (!databaseDidExist) {
    console.log("databaseDidExist:", databaseDidExist)
    // Create any tables needed
    await createTables(db);

    // Populate them with any starter data
    await populateTables(db);
  }
    
  // Return our database
  return db;
};


// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqlite.db'
});
  
module.exports = { setupDatabase, dropDatabase, sequelize };
