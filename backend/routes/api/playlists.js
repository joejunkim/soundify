const express = require('express');
const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")

const router = express.Router();

const db = require('../../db/models')

const validatePlaylist = [
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 20 })
        .withMessage('Please provide name with 20 or fewer characters'),
    check("description")
        .exists({ checkFalsy: true })
        .isLength({ max: 500 })
        .withMessage('Please provide name with 500 or fewer characters'),
]

router.get('/', asyncHandler(async(req, res) => {
    const playlists = await db.Playlist.findAll()
    res.json(playlists);
}))

router.post('/', validatePlaylist, singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const { name, description, libraryId } = req.body;
    let image;
    if (req.file) {
        image = await singlePublicFileUpload(req.file)
    }

    const playlist = await db.Playlist.create({ name, image, description, libraryId });
    return res.json(playlist);
}));

router.put(`/:id`, validatePlaylist, singleMulterUpload("image"), asyncHandler(async (req, res) => {
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
