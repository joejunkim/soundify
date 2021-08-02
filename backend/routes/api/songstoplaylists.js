const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const playlistSongs = await db.SongToPlaylist.findAll()
    res.json(playlistSongs);
}))

router.post('/', asyncHandler(async (req, res) => {
    const playlistSong = await db.SongToPlaylist.create(req.body);
    res.json(playlistSong)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { songId, playlistId } = req.body;
    await db.SongToPlaylist.destroy({ where: { songId, playlistId }});
    res.json();
}));

module.exports = router;
