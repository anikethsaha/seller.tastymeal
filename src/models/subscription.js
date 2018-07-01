'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let subscriptionSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  _productID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cost_per_day: {
    type: Number,
    required: true
  },
  number_of_days: {
    type: Number,
    required : true

  },
  total_cost : {
    type : Number,
    required:true
  },
  offers: {
    type: String,

  },
  discount : {
      type : Number
  },
  _vendorID: {
    type: Schema.Types.ObjectId,
    required : true
  },
  location : {
    type : String,
    required : true
  },
  service_time : {
      type : String,
      required : true
  }

});

module.exports = mongoose.model('Subscription', subscriptionSchema)
