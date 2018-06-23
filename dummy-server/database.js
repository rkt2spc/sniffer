// Dependencies
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

// Flag
let initialized = false;

// Initialize
exports.initialize = async (dbpath) => {
  exports._db = await low(new FileAsync(dbpath));
  initialized = true;
};

// Get Data Access Object
exports.getDAO = () => {
  if (!initialized) throw new Error('Retrieving DAO on uninitialized database');
  return exports._db;
};

// Get Collections
exports.getCollections = () => {
  if (!initialized) throw new Error('Retrieving collections on uninitialized database');
  return {
    records: exports._db.defaults({ records: [] }).get('records'),
  };
};
