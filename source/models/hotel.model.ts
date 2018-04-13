import * as mongoose from 'mongoose';


export interface IHotel extends mongoose.Document {
    name: string;
    address: string;
    description: string;
    phoneNumber: string;
    email: string;
    numberRooms: string;

};

export const HotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    phoneNumber: String,
    email: String,
    numberRooms: String
});

// hash the password before save
HotelSchema.pre('save', function preSaveCallback(next) {
    next();
});



export const Hotel: mongoose.model<IHotel> = mongoose.model<IHotel>('Hotel', HotelSchema);