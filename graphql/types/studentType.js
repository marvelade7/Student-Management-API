const graphql = require("graphql");
const Student = require("../../models/student.model");

const {
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
} = graphql;

const studentType = new GraphQLObjectType({
    name: "studentModel",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        department: { type: GraphQLString },
        level: { type: GraphQLInt },
        age: {type: GraphQLInt}
    },
});

module.exports = studentType;
