const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const graphql = require("graphql");
const Student = require("../models/student.model");

const { GraphQLInt, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } =
    graphql;

const studentType = new GraphQLObjectType({
    name: "studentModel",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        student: {
            type: studentType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                // console.log(args);
                return Student.findOne({ id: args._id });
            },
        },
        students: {
            type: new GraphQLList(studentType),
            resolve() {
                return Student.find();
            },
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createStudent: {
            type: studentType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Student.create({
                    name: args.name,
                    email: args.email,
                })
                    .then((student) => {
                        console.log("Student created successfully");
                        return student;
                    })
                    .catch((err) => {
                        console.log("Error", err);
                    });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
