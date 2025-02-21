/**
  result [icon: check-square, color: orange]{
  id string pk
  testId ObjectId[] test
  userId ObjectId users
  testTitle ObjectTitle test **DO WE NEED TO SAVE THIS ?**
  createdAt Date
  updatedAt Date
}
 */

const mongoose = requier('mongoose');
const schema = mongoose.Schema;

const resultSchema = new schema(
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
  },
  { timestamp: true },
);

module.exports = mongoose.model('Result', resultSchema);
