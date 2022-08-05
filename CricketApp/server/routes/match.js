
const express = require("express");
const { createMatch, getMatchById, getMatchByDate, getAllMatch } = require("../controllers/matchController");


const Match = require("../models/Match");

const router = express.Router();

router.post("/",createMatch);

router.get("/:id",getMatchById);

router.get("/:date",getMatchByDate);

router.get("/",getAllMatch);


module.exports = router;
