const roomController = {
    createRoom: async (request, response) => { 
        try{
            const {createdBy} = request.body;

            const code = Math.random().toString(36)
                .substring(2, 8).toUpperCase();

            await Rooms.create({
                roomCode: code,
                createdBy: createdBy,
            });

            response.json(room);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    getRoomId: async (request, response) => {
        try{
            const code = request.params.code;

            const room = await Rooms.findOne({ roomCode: code });
            if (!room) {
                return response.status(404).json({ message: "Room not found" });
            }
            response.json(room);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    createQuestion: async (request, response) => {
        try{
            const {user, content} = request.body;
            const roomCode = request.params.code;

            const question = await Questions.create({
                roomCode: roomCode,
                content: content,
                user: user,
            });
            response.status(201).json(question);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    getQuestions: async (request, response) => {
        try{
            const roomCode = request.params.code;

            const questions = await Questions
                .find({ roomCode: code })
                .sort({ createdAt: -1 });
            response.json(questions);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error" });
        }
    },

    deleteRoom: async (request, response) => {
        try {
            const { roomCode } = request.params.code;

            const room = await Room.findOneAndDelete({ roomCode });

            if (!room) {
                return response.status(404).json({ message: 'Room not found' });
            }

            // Optional: Also delete all questions from this room
            await Question.deleteMany({ roomCode });

            return response.status(200).json({ message: 'Room and associated questions deleted' });
        } 
        catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteQuestion: async (request, response) => {
        try {
            const { questionId } = request.params;

            const question = await Question.findByIdAndDelete(questionId);

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