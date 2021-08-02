const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const libraries = await db.Library.findAll()
    res.json(libraries);
}))

router.post('/', asyncHandler(async (req, res) => {
    const library = await db.Library.create(req.body);
    res.json(library)
}));

module.exports = router;
