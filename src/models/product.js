'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let productSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required : true

  },
  _vendorID: {
    type: String,
    required : true
  },
  location: {
    type: String,
    required : true
  },
  isSubscripable : {
    type : Boolean,
    required : true
  }

});

module.exports = mongoose.model('Product', productSchema)
