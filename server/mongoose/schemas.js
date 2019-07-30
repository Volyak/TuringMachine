import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    roleId: {
        type: String
    }
});

export const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    priority: {
        type: Number,
        required: true
    },
    taskType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    alphabet: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    tests: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            },
        }
    ]
});

export const SolutionSchema = new Schema({
    taskId: {
        type: ObjectId,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    table: {
        type: Schema.Types.Mixed,
        required: true
    },
        /*[
        [
            {
                writeSymbol: String,
                move: {
                    type: String,
                    required: true
                },
                nextState: {
                    type: Number,
                    required: true
                }
            }
        ]
    ],*/
    isDone: {
        type: Boolean,
        required: true
    },
    numberOfFailedTest: {
        type: Number,
        required: true
    }
});

export const RoleSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        groups: [
            {
                name: {
                    type: String,
                    required: true
                },
                rights: [
                    {
                        name: {
                            type: String,
                            required: true
                        },
                        priority: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ]
    })
;