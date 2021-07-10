
const express = require('express');
const { allEvents, todayCelebration, createEvent, filterPersons } = require('./APIs/query');
const router = express.Router();

router.get('/', (req, res) => {
    res.end('Hello user')
})

router.get('/list-events', allEvents);
router.get('/celebration', todayCelebration);
router.post('/createEvent', createEvent);
router.get('/people', filterPersons);

module.exports = router;