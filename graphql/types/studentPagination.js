const graphql = require("graphql");
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLBoolean } = graphql;

const studentType = require("./studentType");
const StudentType = require("./studentType");

const StudentPaginationType = new GraphQLObjectType({
    name: "StudentPagination",
    fields: () => ({
        students: {
            type: new GraphQLList(StudentType),
        },
        currentPage: {
            type: GraphQLInt,
        },
        totalPages: {
            type: GraphQLInt,
        },
        totalStudents: {
            type: GraphQLInt,
        },
        hasNextPage: {
            type: GraphQLBoolean,
        },
        hasPreviousPage: {
            type: GraphQLBoolean,
        },
        limit: {
            type: GraphQLInt,
        },
    }),
});

module.exports = StudentPaginationType;
