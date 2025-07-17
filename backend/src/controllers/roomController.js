const Rooms = require("../models/Rooms");
const Questions = require("../models/Questions");

const roomController = {
    createRoom: async (request, response) => { 
        try {
            const { createdBy } = request.body;

            const code = Math.random().toString(36)
                .substring(2, 8).toUpperCase();

            const room = await Rooms.create({
                roomCode: code,
                createdBy: createdBy,
            });

            response.json(room);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    getByRoomId: async (request, response) => {
        try {
            const code = request.params.code;

            const room = await Rooms.findOne({ roomCode: code });
            if (!room) {
                return response.status(404).json({ message: "Room not found" });
            }
            response.json(room);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    createQuestion: async (request, response) => {
        try {
            const { user, content } = request.body;
            const roomCode = request.params.code;

            const question = await Questions.create({
                roomCode,
                content,
                user,
            });

            response.status(201).json(question);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    getQuestions: async (request, response) => {
        try {
            const roomCode = request.params.code;

            const questions = await Questions
                .find({ roomCode })
                .sort({ createdAt: -1 });

            response.json(questions);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    summarizeQuestions: async (request, response) => {
        try {
            const code = request.params.code;

            const questions = await Questions.find({ roomCode: code });
            if (questions.length === 0) {
                return response.json([]);
            }

            const summary = await callGemini(questions);
            response.json(summary);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    deleteRoom: async (request, response) => {
        try {
            const roomCode = request.params.code;

            const room = await Rooms.findOneAndDelete({ roomCode });

            if (!room) {
                return response.status(404).json({ message: 'Room not found' });
            }

            await Questions.deleteMany({ roomCode });

            return response.status(200).json({ message: 'Room and associated questions deleted' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteQuestion: async (request, response) => {
        try {
            const { questionId } = request.params;

            const question = await Questions.findByIdAndDelete(questionId);

            if (!question) {
                return response.status(404).json({ message: 'Question not found' });
            }

            return response.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = roomController;
