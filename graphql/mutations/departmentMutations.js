const graphql = require("graphql");
const Department = require("../../models/department.model");
const Faculty = require("../../models/faculty.model");
const DepartmentType = require("../types/departmentType");
const {
    DepartmentInputType,
    DepartmentUpdateInput,
} = require("../types/departmentInputType");
const { GraphQLID } = graphql;
console.log(DepartmentInputType);
console.log(DepartmentUpdateInput);
module.exports = {
    createDepartment: {
        type: DepartmentType,
        args: {
            input: {
                type: DepartmentInputType,
            },
        },
        resolve(parent, args) {
            const input = args.input;
            return Faculty.findById(input.faculty).then((faculty) => {
                if (!faculty) {
                    throw new Error("Faculty not found");
                }
                return Department.create(input);
            });
        },
    },

    updateDepartment: {
        type: DepartmentType,
        args: {
            id: {
                type: GraphQLID,
            },
            input: {
                type: DepartmentUpdateInput,
            },
        },
        resolve(parent, args) {
            return Department.findByIdAndUpdate(args.id, args.input, {
                new: true,
            });
        },
    },

    deleteDepartment: {
        type: DepartmentType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Department.findByIdAndDelete(args.id);
        },
    },
};
