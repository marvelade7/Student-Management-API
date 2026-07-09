require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Faculty = require("../models/faculty.model");
const Department = require("../models/department.model");
const Student = require("../models/student.model");

const faculties = require("./faculties");
const departments = require("./departments");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("Connected to MongoDB");

        return Promise.all([
            Faculty.deleteMany({}),
            Department.deleteMany({}),
            Student.deleteMany({}),
        ]);
    })

    // Insert faculties
    .then(() => {

        return Faculty.insertMany(faculties);

    })

    // Insert departments
    .then((savedFaculties) => {

        const facultyMap = {};

        savedFaculties.forEach((faculty) => {

            facultyMap[faculty.name] = faculty._id;

        });

        const formattedDepartments = departments.map((department) => {

            return {
                name: department.name,
                faculty: facultyMap[department.faculty],
            };

        });

        return Department.insertMany(formattedDepartments);

    })

    // Insert students
    .then((savedDepartments) => {

        const students = [];

        savedDepartments.forEach((department) => {

            for (let i = 1; i <= 25; i++) {

                students.push({

                    firstName: faker.person.firstName(),

                    lastName: faker.person.lastName(),

                    email: faker.internet.email().toLowerCase(),

                    gender:
                        faker.helpers.arrayElement([
                            "Male",
                            "Female",
                        ]),

                    age: faker.number.int({
                        min: 16,
                        max: 30,
                    }),

                    phoneNumber: faker.phone.number(),

                    matricNumber:
                        department.name.substring(0, 3).toUpperCase() +
                        "-" +
                        faker.number.int({
                            min: 1000,
                            max: 9999,
                        }),

                    department: department._id,

                    level: faker.helpers.arrayElement([
                        100,
                        200,
                        300,
                        400,
                        500,
                    ]),

                    cgpa: Number(
                        faker.number
                            .float({
                                min: 1,
                                max: 5,
                                fractionDigits: 2,
                            })
                            .toFixed(2)
                    ),

                    isActive: true,

                });

            }

        });

        return Student.insertMany(students);

    })

    .then(() => {

        console.log("Database seeded successfully!");

        process.exit();

    })

    .catch((err) => {

        console.log(err);

        process.exit(1);

    });