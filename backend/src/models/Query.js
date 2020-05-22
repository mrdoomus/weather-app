// Principal Schema for user queries
const { Schema, model } = require("mongoose");

const QuerySchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  dbRes: {
    type: Object,
    required: true,
  },
});

module.exports = model("Query", QuerySchema);
