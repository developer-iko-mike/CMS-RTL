const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = "${adminToken}"`;

  SabzLearnShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
