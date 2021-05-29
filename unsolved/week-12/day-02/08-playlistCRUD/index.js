const Db = require("./db");

const displayPlaylist = (songs) => {
  songs.forEach((song) => {
    console.log(
      `${song.id}. ${song.title} by ${song.artist} - [${song.genre}]\n`
    );
  });
};

const init = async () => {
  const db = new Db("playlist_db");

  await db.start();

  const allSongs = await db.selectAll("songs");

  displayPlaylist(allSongs);

  db.end();
};

init();
