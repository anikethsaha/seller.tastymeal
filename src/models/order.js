'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let orderSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  _userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _productID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    required : true

  },
  cost: {
    type: Number,
    required : true
  },
  _subscriptionPlanID: {
    type: Schema.Types.ObjectId,
  },
  delivery_location : {
    type : String,
    required : true
  }

});

module.exports = mongoose.model('Order', orderSchema)
