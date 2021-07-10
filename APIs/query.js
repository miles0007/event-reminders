

const con = require('../database/mysql');
const ejs = require('ejs');
const { birthdayEvents, renderHTML, promiseQuery } = require('./utils');
const pool = require('../database/mysql');

const allEvents = (req, res) => {
    const myquery = 'SELECT * FROM users';
    con.query(myquery, (err, data) => {
        if (err) {
            res.end('Error on getting data')
        }
        const resData = (JSON.stringify(data));
        res.end(resData);
    });
}

const todayCelebration = (req, res) => {
    const myquery = 'SELECT * FROM users';
    con.query(myquery, async (err, data) => {
        if (err) {
            res.end('Error on getting data')
        }
        try {
          console.log(data);
          const html = await renderHTML(data);
          res.end(ejs.render(html));
        } catch (e) {
          console.log(e);
        }
    });
}

const createEvent = async (req, res) => {
    const pattern = /^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})$/;
    const user = req.body.user;
    const dob = req.body.dob;
    const fav_image = req.body.fav_image;
    const description = req.body.description;
    const gender = req.body.gender;

    if (dob) {
        const valid = dob.match(pattern)
        if (!valid) {
            res.json({'error': 'dob should match YYYY-MM-DD'})
        }
    }

    if (user && dob && gender) {
        const myquery = `CALL create_birthday_events('${user}','${dob}','${fav_image? fav_image: null}','${description? description: null}','${gender}')`;
        try {
            console.log('trying to promise query')
            const result = await promiseQuery(myquery)
            res.json({'message':'Event added to Database.'})
        } catch(e) {
            res.json({
                'error': "Something went wrong",
                'status': 400,
                'err_message': e
            })
        }
        
        

    } else {
        console.log(user, dob, fav_image, gender)
        res.end()
    }
}

const filterPersons = async (req, res) => {
    if (req.query.user) {
        let query = `CALL filterUser('${req.query.user}');`;
        try {
            const result = await promiseQuery(query);
            console.log(JSON.stringify(result, null, 4));
            res.json(result[0])
        } catch(e) {
            res.json({'error':'something went wrong', e});
        }
        // res.end()
    } else {
        res.json({"error":"user parameter is required"});
    }
}

module.exports = { allEvents, todayCelebration, createEvent, filterPersons }