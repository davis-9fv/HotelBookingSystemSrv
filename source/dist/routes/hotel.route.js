"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_model_1 = require("../models/hotel.model");
module.exports = (passport, router) => {
    router.post('/insert', (req, res, next) => {
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;
        var phoneNumber = req.body.phoneNumber;
        var email = req.body.email;
        var numberRooms = req.body.numberRooms;
        console.log(req.body);
        var hotel = new hotel_model_1.Hotel({
            name: name,
            address: address,
            description: description,
            phoneNumber: phoneNumber,
            email: email,
            numberRooms: numberRooms
        });
        hotel.save();
        return res.status(200).send('Hotel registered successfully');
    });
    router.get('/find', (req, res, next) => {
        hotel_model_1.Hotel.find({}, (err, hotels) => {
            if (err)
                throw res.status(500).send(err);
            ;
            // object of all the users
            console.log(hotels);
            return res.status(200).send(hotels);
        });
    });
    router.post('/findById', (req, res, next) => {
        var hotelId = res.body.hotelId;
        hotel_model_1.Hotel.find({ _id: hotelId }, (err, hotel) => {
            if (err)
                throw res.status(500).send(err);
            ;
            // object of all the users
            console.log(hotel);
            return res.status(200).send(hotel);
        });
    });
    router.post('/update', (req, res, next) => {
        var hotelId = req.body.hotelId;
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;
        var phoneNumber = req.body.phoneNumber;
        var email = req.body.email;
        var numberRooms = req.body.numberRooms;
        console.log(req.body);
        hotel_model_1.Hotel.findOneAndUpdate({ _id: hotelId }, {
            $set: {
                name: name,
                address: address,
                description: description,
                phoneNumber: phoneNumber,
                email: email,
                numberRooms: numberRooms,
                __v: 0
            }
        }, { upsert: true, new: true }, (err, obj) => {
            if (err)
                throw res.status(500).send(err);
            ;
            // object of all the users
            console.log(obj);
            return res.status(200).send(obj);
        });
    });
    return router;
};
