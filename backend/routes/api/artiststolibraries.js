const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const libraryArtists = await db.ArtistToLibrary.findAll()
    res.json(libraryArtists);
}))

router.post('/', asyncHandler(async (req, res) => {
    const libraryArtist = await db.ArtistToLibrary.create(req.body);
    res.json(libraryArtist)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { artistId, libraryId } = req.body;
    const libraryArtist = await db.ArtistToLibrary.findOne({ where : { artistId, libraryId }})
    await db.ArtistToLibrary.destroy({ where: { artistId, libraryId }});
    return res.json(libraryArtist);
}));

module.exports = router;
