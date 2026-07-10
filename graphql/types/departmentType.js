const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const Faculty = require("../../models/faculty.model");
const facultyType = require("./facultyType");

const DepartmentType = new GraphQLObjectType({
    name: "Department",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        faculty: {
            type: facultyType,
            resolve(parent, args) {
                return Faculty.findById(parent.faculty);
            },
        },
    }),
});

module.exports = DepartmentType;
