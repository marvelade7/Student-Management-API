const {
    GraphQLSchema,
    GraphQLObjectType,
} = require("graphql");

const StudentQueries = require("./queries/studentQueries");
const DepartmentQueries = require("./queries/departmentQueries");
const FacultyQueries = require("./queries/facultyQueries");

const StudentMutations = require("./mutations/studentMutations");
const DepartmentMutations = require("./mutations/departmentMutations");
const FacultyMutations = require("./mutations/facultyMutations");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",

    fields: {
        ...StudentQueries,
        ...DepartmentQueries,
        ...FacultyQueries,
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...StudentMutations,
        ...DepartmentMutations,
        ...FacultyMutations,
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});