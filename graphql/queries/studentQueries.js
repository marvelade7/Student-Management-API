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

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        student: {
            type: studentType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                console.log(args);
                return Student.findById({ _id: args.id });
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

module.exports = RootQuery;