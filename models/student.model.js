const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        age: {
            type: Number,
            min: 15,
            max: 100,
        },
        phoneNumber: {
            type: String,
            unique: true,
            sparse: true,
        },
        matricNumber: {
            type: String,
            unique: true,
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        },
        level: {
            type: Number,
            enum: [100, 200, 300, 400, 500],
        },
        cgpa: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Student", studentSchema);
