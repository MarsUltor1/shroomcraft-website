const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        "bsonType": "binData",
        required: true
    }
})