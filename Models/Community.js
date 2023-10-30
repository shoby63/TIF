const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const communitySchema = new Schema({
  id: {
    type: String, // Assuming it's a snowflake ID
    required: true,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 128,
  },
  slug: {
    type: String,
    unique: true,
    maxlength: 255,
  },
  owner: {
    type: String, // Assuming it's a snowflake ID and refers to the User model
    ref: 'User', // Reference to the 'User' model
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
