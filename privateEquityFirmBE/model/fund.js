const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User = require('../model/user');

const fundSchema = new Schema({
    fundName: String,
    openDate: Date,
    totalInvestment: Number,
    investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],
    closedDate: Date,
}, {
    timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Fund = mongoose.model("Fund", fundSchema);
module.exports = Fund;