const graphql = require("graphql");
const Faculty = require("../../models/faculty.model");
const FacultyType = require("../types/facultyType");

const {
    GraphQLID,
    GraphQLList,
} = graphql;

module.exports = {
    faculty: {
        type: FacultyType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Faculty.findById(args.id);
        },
    },

    faculties: {
        type: new GraphQLList(FacultyType),
        resolve() {
            return Faculty.find();
        },
    },
};