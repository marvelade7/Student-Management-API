const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
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
    },
});

module.exports = {
    StudentInputType,
    StudentUpdateInput,
};