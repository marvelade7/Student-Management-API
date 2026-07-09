const graphql = require("graphql");
const Student = require("../../models/student.model");
const studentType = require("../types/studentType");
const Department = require("../../models/department.model");
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
                if (!args.input.firstName || !args.input.firstName.trim()) {
                    throw new Error("First name is required");
                }
                if (!args.input.lastName || !args.input.lastName.trim()) {
                    throw new Error("Last name is required");
                }
                if (!args.input.email || !args.input.email.trim()) {
                    throw new Error("Email is required");
                }
                if (!args.input.gender || !args.input.gender.trim()) {
                    throw new Error("Gender is required");
                }
                if (!args.input.level) {
                    throw new Error("Level is required");
                }
                if (!args.input.age) {
                    throw new Error("Age is required");
                }
                if (
                    !args.input.matricNumber ||
                    !args.input.matricNumber.trim()
                ) {
                    throw new Error("Matric number is required");
                }
                if (!args.input.department || !args.input.department.trim()) {
                    throw new Error("Department is required");
                }

                const validLevels = [100, 200, 300, 400, 500];
                if (!validLevels.includes(args.input.level)) {
                    throw new Error("Invalid level");
                }
                if (args.input.age < 15 || args.input.age > 100) {
                    throw new Error("Age must be between 15 and 100");
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(args.input.email)) {
                    throw new Error("Please enter a valid email address");
                }

                return Department.findById(args.input.department)
                    .then((department) => {
                        if (!department) {
                            throw new Error("Department not found");
                        }

                        return Student.findOne({
                            $or: [
                                { email: args.input.email },
                                { matricNumber: args.input.matricNumber },
                            ],
                        });
                    })
                    .then((existingStudent) => {
                        if (existingStudent) {
                            if (existingStudent.email === args.input.email) {
                                throw new Error("Email already exists");
                            }

                            if (
                                existingStudent.matricNumber ===
                                args.input.matricNumber
                            ) {
                                throw new Error("Matric number already exists");
                            }
                        }

                        return Student.create(args.input);
                    })
                    .then((student) => {
                        console.log("Student created successfully");
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error creating student", err);
                        throw err;
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
                        throw err;
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
                return Student.findByIdAndUpdate(args.id, args.input, {
                    new: true,
                })
                    .then((student) => {
                        console.log("Student updated successfully", student);
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error updating student", err);
                        throw err;
                    });
            },
        },
    },
});

module.exports = RootMutation;
