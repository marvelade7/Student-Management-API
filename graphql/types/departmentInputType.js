const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");

const DepartmentInputType = new GraphQLInputObjectType({
    name: "DepartmentInput",
    fields: {
        name: {
            type: GraphQLString,
        },
        faculty: {
            type: GraphQLID,
        },
    },
});

const DepartmentUpdateInput = new GraphQLInputObjectType({
    name: "DepartmentUpdateInput",
    fields: {
        name: {
            type: GraphQLString,
        },
        faculty: {
            type: GraphQLID,
        },
    },
});

module.exports = {
    DepartmentInputType,
    DepartmentUpdateInput,
};