const express = require('express');
const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")

const router = express.Router();

const db = require('../../db/models')


router.get('/', asyncHandler(async(req, res) => {
    const playlists = await db.Playlist.findAll()
    res.json(playlists);
}))

router.post('/', singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const { name, description, libraryId } = req.body;
    let image;
    if (req.file) {
        image = await singlePublicFileUpload(req.file)
    }

    const playlist = await db.Playlist.create({ name, image, description, libraryId });

    return res.json(playlist);
}));

router.put(`/:id`, singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, description, libraryId } = req.body;
    let image;
    if (req.file) {
        image = await singlePublicFileUpload(req.file)
    }

    const playlist = await db.Playlist.update({ name, image, description, libraryId }, { where: { id } })
    res.json(playlist);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    await db.Playlist.destroy({ where: { id }});
    res.json(id);
}));

module.exports = router;
