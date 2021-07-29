const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async(req, res) => {
    const libraries = await db.Library.findAll()
    res.json(libraries);
}))

module.exports = router;
