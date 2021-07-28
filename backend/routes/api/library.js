const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id
    const library = await db.Library.findOne({ id: id})
    res.json(library);
}))

module.exports = router;
