/**
 testHistory [icon: clipboard, color: red] {
  id string pk
  testId ObjectId[] test
  userId ObjectId users
  title ObjectTitle test  **WE CAN FETCH THE TITLE LATER USING THE ID ONLY**
  score number
  timetaken timestamp
  createdAt Date
  updatedAt Date
}
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testHistorySchema = new schema(
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
    score: {
      type: Number,
      required: true,
    },
    timetaken: {
      type: Date,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model('TestHistory', testHistorySchema);
