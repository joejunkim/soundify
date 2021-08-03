const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const libraryAlbums = await db.AlbumToLibrary.findAll()
    res.json(libraryAlbums);
}))

router.post('/', asyncHandler(async (req, res) => {
    const libraryAlbum = await db.AlbumToLibrary.create(req.body);
    res.json(libraryAlbum)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { albumId, libraryId } = req.body;
    await db.AlbumToLibrary.destroy({ where: { albumId, libraryId }});
    res.json();
}));

module.exports = router;
