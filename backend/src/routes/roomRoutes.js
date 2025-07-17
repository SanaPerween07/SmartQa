const express = require('express');
const router = express.Router();    
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);  
router.get('/:code', roomController.getByRoomId);  
router.post('/:code/questions', roomController.createQuestion);  
router.get('/:code/questions', roomController.getQuestions); 
router.get('/:code/summary', roomController.summarizeQuestions);

module.exports = router;