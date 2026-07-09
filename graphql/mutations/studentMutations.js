const graphql = require("graphql");
const Student = require("../../models/student.model");
const studentType = require("../types/studentType");

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
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Student.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
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
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Student.findByIdAndUpdate(
                    args.id,
                    {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
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