const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// pre hook for encrypting the password for the first time and later whenever modified.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparing the user entered password with the one stored in DB after encryption.
userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log('this.password: ', this.password);
  // console.log('pass_argument: ', password);
  // return await bcrypt.compare(password, this.password);

  if (password === this.password) {
    // console.log('true');
    return true;
  }
  // console.log('false');
  return false;
};

// generating ACCESS token jwt.sign({payload}, secret, {expiresIn});
userSchema.methods.generateAccessToken = async function () {
  // short lived access token
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// generating REFRESH token jwt.sign({payload}, secret, {expiresIn});
userSchema.methods.generateRefreshToken = async function () {
  // long lived access token
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

module.exports = mongoose.model('User', userSchema);
