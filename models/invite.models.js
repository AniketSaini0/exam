/**
 invite [icon: mail, color: green] {
  inviteId string
  testId ObjectId test
  email string
  status enum "PENDING", "ACCEPTED", "REJECTED"
  inviterId ObjectId users
  createdAt Date
  updatedAt Date
}
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const inviteSchema = new schema(
  {
    inviteId: {
      type: string,
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      require: true,
    },
    email: {
      type: string,
      trim: true,
      lowercase: true,
    },
    status: {
      type: string,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    },
    inviterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model('Invite', inviteSchema);
