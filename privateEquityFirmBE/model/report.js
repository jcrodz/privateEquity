const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User = require('../model/user');


const reportSchema = new Schema({
  reportDate: Date,
  reportName: String,
  reportFile: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
}, { 
    timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;