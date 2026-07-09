const graphql = require("graphql");
const Student = require("../../models/student.model");
const studentType = require("../types/studentType");
const {
    studentInputType,
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
                    type: studentInputType,
                },
            },
            resolve(parent, args) {
                return Student.create({
                    firstName: args.input.firstName,
                    lastName: args.input.lastName,
                    email: args.input.email,
                    gender: args.input.gender,
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
