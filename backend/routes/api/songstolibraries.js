const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const librarySongs = await db.SongToLibrary.findAll()
    res.json(librarySongs);
}))

router.post('/', asyncHandler(async (req, res) => {
    const librarySong = await db.SongToLibrary.create(req.body);
    res.json(librarySong)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { songId, libraryId } = req.body;
    const librarySong = await db.SongToLibrary.findOne({ where: { songId, libraryId }})
    await db.SongToLibrary.destroy({ where: { songId, libraryId }});
    return res.json(librarySong);
}));

module.exports = router;
