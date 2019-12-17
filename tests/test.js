const {
  downloadYutubePlaylist,
  downloadYutubeSong
} = require('../src/main.js');
const fs = require('fs');

describe('Testing youtu-playlist-downloader package', () => {
  const correctOutputSong = './downloads';
  const correctIdSong = 'JKSM4KLdQRI';
  const correctNameSong = 'test-song-name';
  beforeEach(() => {
    jest.setTimeout(60 * 1000 * 10); // 10 minutes
  });

  test(
    '\nTesting downloadYutubeSong function with correct inputs' +
      `\nyoutube song output: ${correctOutputSong}` +
      `\nyoutube song id: ${correctIdSong}` +
      `\nyoutube song name: ${correctNameSong}`,
    async () => {
      expect(
        await downloadYutubeSong(
          correctOutputSong,
          correctIdSong,
          correctNameSong
        )
      );
    }
  );
});

describe('Testing youtu-playlist-downloader package', () => {
  const correctOutputPlaylist = './downloads';
  const correctIdPlaylist = 'PLxQ30nUCB0uOYwtYL3Ll2y1uugEkKhszs';
  const correctConcurrency = 2;
  const correctStartIndex = 1;
  beforeEach(() => {
    jest.setTimeout(60 * 1000 * 10); // 10 minutes
  });

  test(
    '\nTesting downloadYutubeSong function with correct inputs' +
      `\nyoutube playlist output: ${correctOutputPlaylist}` +
      `\nyoutube playlist id: ${correctIdPlaylist}` +
      `\nyoutube playlist concurrency: ${correctConcurrency}` +
      `\nyoutube playlist startIndex: ${correctStartIndex}`,
    async () => {
      expect(
        await downloadYutubePlaylist(
          correctOutputPlaylist,
          correctIdPlaylist,
          correctConcurrency,
          correctStartIndex
        )
      );
    }
  );
});

describe('Testing youtu-playlist-downloader package', () => {
  const correctOutputPlaylist = './downloads';
  const correctIdPlaylist = 'PLxQ30nUCB0uOYwtYL3Ll2y1uugEkKhszs';
  const correctConcurrency = 1;
  const correctStartIndex = 0;
  beforeEach(() => {
    jest.setTimeout(60 * 1000 * 10); // 10 minutes
  });

  test(
    '\nTesting downloadYutubeSong function with correct inputs' +
      `\nyoutube playlist output: ${correctOutputPlaylist}` +
      `\nyoutube playlist id: ${correctIdPlaylist}` +
      `\nyoutube playlist concurrency: ${correctConcurrency}` +
      `\nyoutube playlist startIndex: ${correctStartIndex}`,
    async () => {
      expect(
        await downloadYutubePlaylist(
          correctOutputPlaylist,
          correctIdPlaylist,
          correctConcurrency,
          correctStartIndex
        )
      );
    }
  );
});

describe('Testing youtu-playlist-downloader package', () => {
  const correctOutputPlaylist = './downloads';
  const correctIdPlaylist = 'PLxQ30nUCB0uOYwtYL3Ll2y1uugEkKhszs';
  beforeEach(() => {
    jest.setTimeout(60 * 1000 * 10); // 10 minutes
  });

  test(
    '\nTesting downloadYutubeSong function with correct inputs' +
      `\nyoutube playlist output: ${correctOutputPlaylist}` +
      `\nyoutube playlist id: ${correctIdPlaylist}`,
    async () => {
      expect(
        await downloadYutubePlaylist(
          correctOutputPlaylist,
          correctIdPlaylist,
          correctConcurrency,
          correctStartIndex
        )
      );
    }
  );
});
