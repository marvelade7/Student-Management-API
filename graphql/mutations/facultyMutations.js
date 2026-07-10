const graphql = require("graphql");
const Faculty = require("../../models/faculty.model");
const FacultyType = require("../types/facultyType");
const {
    FacultyInputType,
    FacultyUpdateInput,
} = require("../types/facultyInputType");
const { GraphQLID } = graphql;

module.exports = {
    createFaculty: {
        type: FacultyType,
        args: {
            input: {
                type: FacultyInputType,
            },
        },
        resolve(parent, args) {
            return Faculty.create(args.input);
        },
    },
    updateFaculty: {
        type: FacultyType,
        args: {
            id: {
                type: GraphQLID,
            },
            input: {
                type: FacultyUpdateInput,
            },
        },
        resolve(parent, args) {
            return Faculty.findByIdAndUpdate(
                args.id,
                args.input,
                {
                    new: true,
                }
            );
        },
    },
    deleteFaculty: {
        type: FacultyType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Faculty.findByIdAndDelete(args.id);
        },
    },
};