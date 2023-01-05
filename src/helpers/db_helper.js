const db = require('../config/db.config');

const _db = (query, data, cb) => {
  db.query(query, data, (err, res) => {
    if (err) {
      logger.error(err.message);
      cb(err, null);
      return;
    }
    if (res.length) {
      cb(null, res);
      return;
    }
    cb({ kind: "not_found" }, null);
  })
}

module.exports = {
  _db
}