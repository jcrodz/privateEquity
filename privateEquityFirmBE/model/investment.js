const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User = require('../model/user');

const investmentSchema = new Schema({
    fund: { type: Schema.Types.ObjectId, ref: 'Fund' },
    investmentDate: Date,
    totalInvestment: Number,
    investor: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Investment = mongoose.model("Investment", investmentSchema);
module.exports = Investment;