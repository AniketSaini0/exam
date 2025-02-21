/*
result [icon: check-square, color: orange]{
    id string pk
    testId ObjectId[] test
    userId ObjectId users
    testTitle ObjectTitle test
    createdAt Date
    updatedAt Date
  }
*/
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const workspaceSchema = new schema(
  {
    testId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    testTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Workspace', workspaceSchema);
