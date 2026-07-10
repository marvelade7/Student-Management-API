const graphql = require("graphql");
const Student = require("../../models/student.model");
const Department = require("../../models/department.model");
const StudentType = require("../types/studentType");
const {
    StudentInputType,
    StudentUpdateInput,
} = require("../types/studentInputType");
const { GraphQLID } = graphql;
console.log(StudentInputType);
console.log(StudentUpdateInput);
module.exports = {
    createStudent: {
        type: StudentType,
        args: {
            input: {
                type: StudentInputType,
            },
        },
        resolve(parent, args) {
            const input = args.input;
            if (!input.firstName || !input.firstName.trim()) {
                throw new Error("First name is required");
            }
            if (!input.lastName || !input.lastName.trim()) {
                throw new Error("Last name is required");
            }
            if (!input.email || !input.email.trim()) {
                throw new Error("Email is required");
            }
            if (!input.department) {
                throw new Error("Department is required");
            }
            return Student.findOne({
                $or: [
                    { email: input.email },
                    { matricNumber: input.matricNumber },
                ],
            })
                .then((student) => {
                    if (student) {
                        throw new Error(
                            "Email or Matric Number already exists"
                        );
                    }
                    return Department.findById(input.department);
                })
                .then((department) => {
                    if (!department) {
                        throw new Error("Department not found");
                    }
                    return Student.create(input);
                });
        },
    },

    updateStudent: {
        type: StudentType,
        args: {
            id: {
                type: GraphQLID,
            },
            input: {
                type: StudentUpdateInput,
            },
        },
        resolve(parent, args) {
            return Student.findByIdAndUpdate(
                args.id,
                args.input,
                {
                    new: true,
                }
            );
        },
    },

    deleteStudent: {
        type: StudentType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Student.findByIdAndDelete(args.id);
        },
    },
};