const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const playlists = await db.Playlist.findAll()
    res.json(playlists);
}))

module.exports = router;
