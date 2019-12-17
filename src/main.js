const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ytdl = require('ytdl-core');
const queue = require('queue');

const { getYoutubeInfo, isValidId } = require('youtu-get');

const yellowColor = '\x1b[33m%s\x1b[0m';
const redColor = '\x1b[31m%s\x1b[0m';
const greenColor = '\x1b[32m%s\x1b[0m';

const downloadYutubeSong = async (
  output,
  id,
  name,
  index = 0,
  concurrency = 1
) => {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }
  return new Promise(resolve => {
    const song = ytdl(id, {
      quality: 'highestaudio',
      filter: 'audioonly',
      audioEncoding: 'mp3'
    });
    song.pipe(fs.createWriteStream(`${output}/${name}.mp4`));
    let starttime;
    song.once('response', () => {
      starttime = Date.now();
    });
    song.on('progress', (chunkLength, downloaded, total) => {
      if (concurrency !== 1) {
        readline.cursorTo(process.stdout, 0);
        // ----------------- indexCommandText -----------------
        const indexCommandText = `Downloading song: ${index} | `;
        // ----------------- sizeCommandText -----------------
        const percentageCount = downloaded / total;
        const percentage = (percentageCount * 100).toFixed(2);
        const percentageCommandText = `${percentage}% downloaded | `;
        const sizeCommandText = `(${(downloaded / 1024 / 1024).toFixed(
          2
        )} MB of ${(total / 1024 / 1024).toFixed(2)} MB) |`;
        // ----------------- finishDownloadedTimeText -----------------
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const finishDownloadedTimeText = ` running for: ${downloadedMinutes.toFixed(
          2
        )} minutes | estimated time left: ${(
          downloadedMinutes / percentageCount -
          downloadedMinutes
        ).toFixed(2)}minutes`;
        // ----------------- command output -----------------
        process.stdout.write(
          `${indexCommandText}${percentageCommandText}${sizeCommandText}${finishDownloadedTimeText}`
        );
      }
    });
    song.on('end', () => {
      console.log(greenColor, `\nDownloaded song: ${index} | name: ${name}`);
      resolve();
    });
    song.on('error', () => {
      console.error(
        redColor,
        `\nCouldn't download song: ${index} | name: ${name}`
      );
      resolve();
    });
  });
};

const downloadYutubePlaylist = async (
  output,
  id,
  concurrency = 1,
  startIndex = 0
) => {
  if (isValidId(id) && typeof output === 'string') {
    return false;
  }

  !fs.existsSync(output) && fs.mkdirSync(output);

  const q = queue({ results: [] });
  q.concurrency = concurrency;

  const playlist = await getYoutubeInfo(id);

  if (playlist.length === 0) {
    return console.log(redColor, 'your playlist on youtube is empty');
  } else {
    console.log(yellowColor, `Your playlist has: ${playlist.length} songs`);
  }

  playlist.map((item, index) => {
    if (index >= startIndex) {
      return q.push(() =>
        downloadYutubeSong(output, item.id, item.name, index, concurrency)
      );
    }
  });

  q.start(() => {
    console.log(greenColor, 'All playlist downloaded');
  });
};

module.exports = { downloadYutubePlaylist, downloadYutubeSong };
