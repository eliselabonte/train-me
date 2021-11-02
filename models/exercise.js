const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Enter an exercise name."
    },
    workout: [
        { type: Schema.Types.ObjectId, ref: 'Workout' }
    ]
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;