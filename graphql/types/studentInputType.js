const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require("graphql");

const StudentInputType = new GraphQLInputObjectType({
    name: "StudentInput",
    fields: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        gender: {
            type: new GraphQLNonNull(GraphQLString),
        },
        department: {
            type: new GraphQLNonNull(GraphQLString),
        },
        level: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        matricNumber: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
});

const StudentUpdateInput = new GraphQLInputObjectType({
    name: "StudentUpdateInput",
    fields: {
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        gender: {
            type: GraphQLString,
        },
        department: {
            type: GraphQLString,
        },
        level: {
            type: GraphQLInt,
        },
        age: {
            type: GraphQLInt,
        },
        matricNumber: {
            type: GraphQLString,
        },
    },
});

module.exports = {
    StudentInputType,
    StudentUpdateInput,
};
