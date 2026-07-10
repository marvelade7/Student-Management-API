const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const Department = require("../../models/department.model");

const FacultyType = new GraphQLObjectType({
    name: "Faculty",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        departments: {
            type: new GraphQLList(require("./departmentType")),
            resolve(parent, args) {
                return Department.find({ faculty: parent.id });
            },
        },
    }),
});


module.exports = FacultyType;
