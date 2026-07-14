const graphql = require("graphql");
const Student = require("../../models/student.model");
const Department = require("../../models/department.model");
const departmentType = require("./departmentType");

const {
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
} = graphql;

const studentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        department: {
            type: departmentType,
            resolve(parent, args) {
                return Department.findById(parent.department);
            },
        },
        level: { type: GraphQLInt },
        age: { type: GraphQLInt },
        matricNumber: { type: GraphQLString },
    }),
});

module.exports = studentType;
