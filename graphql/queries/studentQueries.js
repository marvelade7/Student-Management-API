const graphql = require("graphql");
const Student = require("../../models/student.model");
const StudentType = require("../types/studentType");
const StudentPaginationType = require("../types/studentPagination");

const { GraphQLID, GraphQLList, GraphQLInt, GraphQLString } = graphql;

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
            level: {
                type: GraphQLString,
            },
            gender: {
                type: GraphQLString,
            },
            department: {
                type: GraphQLID,
            },
            faculty: {
                type: GraphQLID,
            },
        },
        resolve(parent, args) {
            const filter = {};
            if (args.level) {
                filter.level = args.level;
            }
            if (args.gender) {
                filter.gender = args.gender;
            }
            if (args.department) {
                filter.department = args.department;
            }
            if (args.faculty) {
                filter.faculty = args.faculty;
            }
            const page = args.page || 1;
            const limit = args.limit || 10;

            const skip = (page - 1) * limit;

            return Student.countDocuments(filter).then((totalStudents) => {
                return Student.find(filter)
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

    searchStudent: {
        type: StudentPaginationType,
        args: {
            keyword: {
                type: GraphQLString,
            },
            page: {
                type: GraphQLInt,
            },
            level: {
                type: GraphQLInt,
            },
            gender: {
                type: GraphQLString,
            },
            department: {
                type: GraphQLID,
            },
            limit: {
                type: GraphQLInt,
            },
        },
        resolve(parent, args) {
            const filter = {};
            if (args.level) {
                filter.level = args.level;
            }
            if (args.gender) {
                filter.gender = args.gender;
            }
            if (args.department) {
                filter.department = args.department;
            }

            if (args.keyword) {
                filter.$or = [
                    {
                        firstName: {
                            $regex: args.keyword,
                            $options: "i",
                        },
                    },
                    {
                        lastName: {
                            $regex: args.keyword,
                            $options: "i",
                        },
                    },
                    {
                        email: {
                            $regex: args.keyword,
                            $options: "i",
                        },
                    },
                    {
                        matricNumber: {
                            $regex: args.keyword,
                            $options: "i",
                        },
                    },
                ];
            }

            const page = args.page || 1;
            const limit = args.limit || 10;

            const skip = (page - 1) * limit;

            return Student.countDocuments(filter).then((totalStudents) => {
                return Student.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .populate("department")
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
