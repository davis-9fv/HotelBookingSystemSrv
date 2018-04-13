"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
exports.HotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    phoneNumber: String,
    email: String,
    numberRooms: String
});
// hash the password before save
exports.HotelSchema.pre('save', function preSaveCallback(next) {
    next();
});
exports.Hotel = mongoose.model('Hotel', exports.HotelSchema);
