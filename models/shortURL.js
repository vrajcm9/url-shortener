const mongoose = require('mongoose');
const shortId = require('shortid');

const shortURLSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: shortId.generate
    },
    creationTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    previousHourVisits: {
        type: Number,
        required: true,
        expires: 3600,
        default: 0
    },
    totalVisits: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortURL', shortURLSchema);