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
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: 'Untitled',
    },
    testIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: false,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Workspace', workspaceSchema);
