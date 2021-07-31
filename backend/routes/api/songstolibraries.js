const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const libSongs = await db.SongToLibrary.findAll()
    res.json(libSongs);
}))

router.post('/', asyncHandler(async (req, res) => {
    const libSong = await db.SongToLibrary.create(req.body);
    res.json(libSong)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { songId, libraryId } = req.body;
    await db.SongToLibrary.destroy({ where: { songId, libraryId }});
    res.json();
}));

module.exports = router;
