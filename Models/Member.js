const mongoose =require('mongoose');
const schema =mongoose.Schema;
const memberSchema=new schema({
    id: {
        type: String, // Assuming it's a snowflake ID
        required: true,
        unique: true,
      },
      community: {
        type: String, // Assuming it's a snowflake ID and refers to the Community model
        ref: 'Community', // Reference to the 'Community' model
        required: true,
      },
      user: {
        type: String, // Assuming it's a snowflake ID and refers to the User model
        ref: 'User', // Reference to the 'User' model
        required: true,
      },
      role: {
        type: String, // Assuming it's a snowflake ID and refers to the Role model
        ref: 'Role', // Reference to the 'Role' model
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    });
    
const Member = mongoose.model('Member', memberSchema);
module.exports=Member;