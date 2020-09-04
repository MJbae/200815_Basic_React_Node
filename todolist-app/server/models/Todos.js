const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodosSchema = mongoose.Schema(
  {
    todoId: {
      type: Schema.Types.ObjectId,
    },
    todoTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", TodosSchema);

module.exports = { Todos };
