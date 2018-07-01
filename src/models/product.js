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
    type: Number
  },
  description: {
    type: String,
    required : true
  },
  _vendorID: {
    type: Schema.Types.ObjectId,
    ref : 'Seller',
    required : true
  },
  isNonVeg : {
    type : Boolean,
    required : true,
    Default : true
  },
  location: {
    type: String,
    required : true
  },
  isSubscripable : {
    type : Boolean,
    required : true
  },
  rating : {
    type : Number,
    Default : 0
  }

});

module.exports = mongoose.model('Product', productSchema)
