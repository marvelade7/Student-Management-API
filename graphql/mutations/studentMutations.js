const graphql = require("graphql");
const Student = require("../../models/student.model");
const studentType = require("../types/studentType");
const {
    StudentInputType,
    StudentUpdateInput,
} = require("../types/studentInputType");

const {
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
} = graphql;

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createStudent: {
            type: studentType,
            args: {
                // firstName: { type: new GraphQLNonNull(GraphQLString) },
                // lastName: { type: new GraphQLNonNull(GraphQLString) },
                // email: { type: new GraphQLNonNull(GraphQLString) },

                input: {
                    type: StudentInputType,
                },
            },
            resolve(parent, args) {
                if (!args.input.firstName.trim()) {
                    throw new Error("First name is required");
                }
                if (!args.input.lastName.trim()) {
                    throw new Error("Last name is required");
                }
                if (!args.input.email.trim()) {
                    throw new Error("Email is required");
                }
                if (!args.input.gender.trim()) {
                    throw new Error("Gender is required");
                }
                if (!args.input.level) {
                    throw new Error("Level is required");
                }
                if (!args.input.age) {
                    throw new Error("Age is required");
                }
                if (!args.input.matricNumber.trim()) {
                    throw new Error("Matric number is required");
                }
                const level = args.input.level;
                if (level < 100 || level > 500) {
                    throw new Error("Level must be between 100 and 500");
                }
                const age = args.input.age;
                if (age < 15 || age > 100) {
                    throw new Error("Age must be between 15 and 100");
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(args.input.email)) {
                    throw new Error("Please enter a valid email address");
                }
                return Student.create({
                    firstName: args.input.firstName,
                    lastName: args.input.lastName,
                    email: args.input.email,
                    gender: args.input.gender,
                    department: args.input.department,
                    level: args.input.level,
                    age: args.input.age,
                    matricNumber: args.input.matricNumber,
                })
                    .then((student) => {
                        console.log("Student created successfully");
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error", err);
                        return err;
                    });
            },
        },
        deleteStudent: {
            type: studentType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Student.findByIdAndDelete(args.id)
                    .then((student) => {
                        console.log("Student deleted", student);
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error deleting student", err);
                        return err;
                    });
            },
        },
        updateStudent: {
            type: studentType,
            args: {
                id: { type: GraphQLID },
                // firstName: { type: GraphQLString },
                // lastName: { type: GraphQLString },
                // email: { type: GraphQLString },
                input: {
                    type: StudentUpdateInput,
                },
            },
            resolve(parent, args) {
                return Student.findByIdAndUpdate(
                    args.id,
                    {
                        firstName: args.input.firstName,
                        lastName: args.input.lastName,
                        email: args.input.email,
                        gender: args.input.gender,
                        department: args.input.department,
                        level: args.input.level,
                        age: args.input.age,
                        matricNumber: args.input.matricNumber,
                    },
                    {
                        new: true,
                    },
                )
                    .then((student) => {
                        console.log("Student updated successfully", student);
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error updating student", err);
                        return err;
                    });
            },
        },
    },
});

module.exports = RootMutation;
