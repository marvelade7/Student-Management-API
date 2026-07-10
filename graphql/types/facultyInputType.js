const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const FacultyInputType = new GraphQLInputObjectType({
    name: "FacultyInput",
    fields: {
        name: {
            type: GraphQLString,
        },
    },
});

const FacultyUpdateInput = new GraphQLInputObjectType({
    name: "FacultyUpdateInput",
    fields: {
        name: {
            type: GraphQLString,
        },
    },
});

module.exports = {
    FacultyInputType,
    FacultyUpdateInput,
};
