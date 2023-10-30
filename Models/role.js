const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  id: {
    type: String, // Assuming it's a snowflake ID
    required: true,
    unique: true,
  },
  community: {
    type: String, // Assuming it's a snowflake ID and refers to the Community model
    ref: 'Community', // Reference to the 'Community' model
  },
  user: {
    type: String, // Assuming it's a snowflake ID and refers to the User model
    ref: 'User', // Reference to the 'User' model
  },
  role: {
    type: String, // Assuming it's a snowflake ID and refers to the Role model
    ref: 'Role', // Reference to the 'Role' model
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
