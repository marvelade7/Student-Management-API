const graphql = require("graphql");
const Student = require("../../models/student.model");
const StudentType = require("../types/studentType");
const StudentPaginationType = require("../types/studentPagination");

const { GraphQLID, GraphQLList, GraphQLInt } = graphql;

module.exports = {
    student: {
        type: StudentType,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            return Student.findById(args.id);
        },
    },

    students: {
        type: StudentPaginationType,
        args: {
            page: {
                type: GraphQLInt,
            },
            limit: {
                type: GraphQLInt,
            },
        },
        resolve(parent, args) {
            const page = args.page || 1;
            const limit = args.limit || 10;

            const skip = (page - 1) * limit;

            return Student.countDocuments().then((totalStudents) => {
                return Student.find()
                    .skip(skip)
                    .limit(limit)
                    .then((students) => {
                        const totalPages = Math.ceil(totalStudents / limit);

                        return {
                            students,
                            currentPage: page,
                            totalPages,
                            totalStudents,
                            hasNextPage: page < totalPages,
                            hasPreviousPage: page > 1,
                        };
                    });
            });
        },
    },
};
