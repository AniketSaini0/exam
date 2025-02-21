/*
id string pk
title string
category ObjectTitle category *DO WE NEED THIS ?*
description string
duration string
type string ***DON'T NEED THIS***
negativeMarking boolean
status enum "ACTIVE", "INACTIVE", "COMPLETED"
visibility enum "PRIVATE", "PUBLIC", "GROUP"
createdBy ObjectId users
createdAt Date  
updatedAt Date
*/

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    negativeMarking: {
      type: number, // validate the datatype
      default: 0,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'COMPLETED'],
      required: true,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ['PRIVATE', 'PUBLIC', 'GROUP'],
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Test', testSchema);
