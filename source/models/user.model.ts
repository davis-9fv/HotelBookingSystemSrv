import * as mongoose from 'mongoose';

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
};

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// hash the password before save
UserSchema.pre('save', function preSaveCallback(next) {
    // user
    var _this = this;

    // only hash the password if it has been modified (or is new)
    if (!_this.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function genSaltCallback(err, salt) {
        if (err) {
            return next(err);
        }

        // hash the password along with our new salt
        bcrypt.hash(_this.password, salt, function hashCallback(err, hash) {
            if (err) {
                return next(err);
            }

            // override the cleartext password with the hashed one
            _this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function compareCallback(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


export const User: mongoose.model<IUser> = mongoose.model<IUser>('User', UserSchema);