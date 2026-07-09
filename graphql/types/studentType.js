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
    },
});

module.exports = studentType;
