const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    console.log('-----> IN THE ROUTE')
    const playlists = await db.Playlist.findAll()
    res.json(playlists);
}))

router.post('/', asyncHandler(async (req, res) => {
    const playlist = await db.Playlist.create(req.body);
    res.json(playlist)
}));

router.put(`/:id`, asyncHandler(async (req, res) => {
    const id = req.params.id;
    await db.Playlist.update(req.body, { where: { id } })
    res.json(id);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    await db.Playlist.destroy({ where: { id }});
    res.json(id);
}));

module.exports = router;
