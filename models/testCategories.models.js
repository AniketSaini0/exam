/**
 testCategories [icon: list, color: white] {
  id string pk
  name string
  testId ObjectId[] test
  createdAt Date
  updatedAt Date
}
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testCategorySchema = new schema(
  {
    name: {
      type: string,
      required: true,
    },
    testId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
      },
    ],
  },
  { timestamp: true },
);

module.exports = mongoose.model('TestCategory', testCategorySchema);
