const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const songs = await db.Song.findAll()
    res.json(songs);
}))

module.exports = router;
