const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const albums = await db.Album.findAll()
    res.json(albums);
}))

module.exports = router;
