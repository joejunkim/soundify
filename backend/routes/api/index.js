const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const librariesRouter = require("./libraries.js");
const playlistsRouter = require("./playlists.js");
const artistsRouter = require("./artists.js")
const albumsRouter = require("./albums.js");
const songsRouter = require("./songs.js");
const songsToLibrariesRouter = require("./songstolibraries.js")
const songsToPlaylistsRouter = require("./songstoplaylists.js")
const artistsToLibraryRouter = require("./artiststolibraries.js")
const albumsToLibraryRouter = require("./albumstolibraries.js")
const { route } = require("./session.js");

// // GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/libraries", librariesRouter)
router.use("/playlists", playlistsRouter)
router.use("/artists", artistsRouter)
router.use("/albums", albumsRouter)
router.use("/songs", songsRouter)
router.use("/songstolibraries", songsToLibrariesRouter)
router.use("/songstoplaylists", songsToPlaylistsRouter)
router.use("/artiststolibraries", artistsToLibraryRouter)
router.use("/albumstolibraries", albumsToLibraryRouter)

module.exports = router;
