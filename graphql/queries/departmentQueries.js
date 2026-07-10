const graphql = require("graphql");
const Department = require("../../models/department.model");
const DepartmentType = require("../types/departmentType");

const {
    GraphQLID,
    GraphQLList,
} = graphql;

module.exports = {
    department: {
        type: DepartmentType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Department.findById(args.id);
        },
    },

    departments: {
        type: new GraphQLList(DepartmentType),
        resolve() {
            return Department.find();
        },
    },
};