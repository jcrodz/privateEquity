const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const Fund = require('../model/fund');
// const Report = require('../model/report');

const userSchema = new Schema({
  company: String,
  contactName: String,
  username: String,
  password: String,
  contactPhone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  role: {
    	type: String,
    	enum : ['ADMIN', 'USER', 'INVESTOR'],
    	default : 'INVESTOR'
  	},
  investments: [{ type : Schema.Types.ObjectId, ref: 'Investment' }],
  reports: [{ type : Schema.Types.ObjectId, ref: 'Report' }],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;