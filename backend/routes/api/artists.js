const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const artists = await db.Artist.findAll()
    res.json(artists);
}))

module.exports = router;
