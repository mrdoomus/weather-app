const { Router } = require("express");
const router = Router();
const { cityInfo } = require("../controllers/weather.controller");

// POST to database(city, IP, res)
router.post("/weather/:city", cityInfo);

module.exports = router;
