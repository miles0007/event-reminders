
const con = require("../database/mysql");

function promiseQuery(query) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
      return;
    });
  });
} 

async function create_log(message) {
  console.log(message);
  const query = `CALL create_log('${message}')`;
  try {
    const result = await promiseQuery(query);
    console.log(result);
  } catch (e) {
    console.log("Error occured", e);
  }
}

module.exports = { create_log, promiseQuery };