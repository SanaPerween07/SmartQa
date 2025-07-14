const express = require('express');
const router = express.Router();    
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);  
router.get('/room/:code', roomController.getRoomId);  
router.post('/room/:code/questions', roomController.createQuestion);  
router.get('/room/:code/questions', roomController.getQuestions); 

module.exports = router;