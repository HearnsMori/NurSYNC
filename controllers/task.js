const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const buildQuery = (keys, values) => {
  const query = {};
  keys.forEach((k, i) => {
    query[k] = values[i];
  });
  return query;
};

const create = async (req, res) => {
  if(req.newToken) {
   return res.status(201).json({
      newToken: req.newToken
   });
  }
  let { key, keyVal, field, newVal } = req.body;
  console.log('Request Body:', req.body); // Debug log
  // Normalize to arrays
  key = Array.isArray(key) ? key : [key];
  keyVal = Array.isArray(keyVal) ? keyVal : [keyVal];
  field = Array.isArray(field) ? field : [field];
  newVal = Array.isArray(newVal) ? newVal : [newVal];
  // Check length consistency
  if (key.length !== keyVal.length || field.length !== newVal.length) {
    return res.status(400).json({ error: 'Keys/keyVals and fields/newVals must match in length.' });
  }
  try {
    if (!req.taskId) {
      return res.status(401).json({ error: 'Token expired. Login again.' });
    }
    // Prevent creation of secured fields
    const notAllowedFields = [];
    for (let col of field) {
      if (notAllowedFields.includes(col)) {
        return res.status(403).json({ error: `Field "${col}" is secured.` });
      }
    }
    // Construct object for creation
    const newDoc = {};
    key.forEach((k, i) => {
      newDoc[k] = String(keyVal[i]).toLowerCase() === 'self' ? req.taskId : keyVal[i];
    });
    field.forEach((f, i) => {
      newDoc[f] = newVal[i];
    });
    // Save to database
    const task = await Task.create(newDoc);
    console.log('Created Document:', created); // Debug log
    res.status(201).json({ msg: 'Task created successfully.', id: created._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Could not create task.' });
  }
};

const read = async (req, res) => {
  if(req.newToken) {
   return res.status(201).json({
      newToken: req.newToken
   });
  }
  let { key, keyVal, field, newVal } = req.body;
  try {
    console.log('Request Body:', req.body); // Debug log
    if (!req.taskId) {
      return res.status(401).json({ error: 'Token expired. Login Again.' });
    }
    key = Array.isArray(key) ? key : [key];
    keyVal = Array.isArray(keyVal) ? keyVal : [keyVal];
    field = Array.isArray(field) ? field : [field];
    keyVal = keyVal.map(v => (v.toLowerCase() === 'self' ? req.taskId : v));
    console.log('key:', key, 'keyVal:', keyVal); // Debug log
    const notAllowedFields = [];
    if (field.some(f => notAllowedFields.includes(f))) {
      return res.status(403).json({ error: 'Fields you are looking for are secured.' });
    }
    const query = buildQuery(key, keyVal);
    console.log('Built Query:', query); // Debug log
    const task = await Task.find(query).select(field.join(' '));
    console.log('Found Data:', data); // Debug log
    const stack = task.map(doc => {
      let obj = {};
      field.forEach(f => {
        obj[f] = doc[f];
      });
      return obj;
    });
    res.status(200).json({ stack });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error in the server occurred. Try Again.' });
  }
};

const update = async (req, res) => {
  if(req.newToken) {
   return res.status(201).json({
      newToken: req.newToken
   });                                                                                                                  }
  let { key, keyVal, field, newVal } = req.body;
  console.log('Request Body:', req.body); // Debug log
  key = Array.isArray(key) ? key : [key];
  keyVal = Array.isArray(keyVal) ? keyVal : [keyVal];                                                                   field = Array.isArray(field) ? field : [field];
  newVal = Array.isArray(newVal) ? newVal : [newVal];
  if (field.length !== newVal.length) {                                                                                   return res.status(400).json({ error: 'Fields and newVals must be arrays of the same length.' });
  }                                                                                                                     console.log('key:', key, 'keyVal:', keyVal); // Debug log
  try {
    if (!req.taskId) {
      return res.status(401).json({ error: 'Token expired. Login again.' });
    }
    const notAllowedFields = [];                                                                                          for (let col of field) {
      if (notAllowedFields.includes(col)) {
        return res.status(403).json({ error: `Field "${col}" is secured.` });
      }
    }
    const query = buildQuery(key, keyVal);
    const task = await Task.findOne(query);
    console.log('App found:', app); // Debug log
    if (!task) {
      return res.status(404).json({ error: `No app found with given keys.` });
    }
    field.forEach((col, i) => {
      task[col] = newVal[i];
    });
    await app.save();
    res.status(200).json({ msg: 'Fields updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
};

const deletE = async (req, res) => {
  if(req.newToken) {
   return res.status(201).json({
      newToken: req.newToken
   });
  }
  let { key, keyVal, field, newVal } = req.body;
  key = Array.isArray(key) ? key : [key];
  keyVal = Array.isArray(keyVal) ? keyVal : [keyVal];
  if (key.length !== keyVal.length) {
    return res.status(400).json({ error: 'key and keyVal arrays must have the same length.' });
  }
  console.log('Request Body:', req.body); // Debug log
  console.log('Query:', key, keyVal); // Debug log
  const query = {};
  key.forEach((k, i) => {
    query[k] = keyVal[i];
  });
  console.log('Built Query:', query); // Debug log
  try {
    if (!req.taskId) {
      return res.status(401).json({ error: 'Token expired. Login again.' });
    }
    const task = await Task.findOne(query);
    console.log('App found:', app); // Debug log
    if (!task) {
      return res.status(404).json({ error: `No app found with given keys.` });
    }
    await Task.deleteOne(query);
    res.status(200).json({ msg: 'App deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
};

module.exports = {create, read, update, deletE};
