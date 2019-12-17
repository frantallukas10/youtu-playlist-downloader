#!/usr/bin/env node
const path = require('path');
const { downloadYutubePlaylist } = require('./src/main.js');
const redColor = '\x1b[31m%s\x1b[0m';
const yellowColor = '\x1b[33m%s\x1b[0m';
const { isValidId } = require('youtu-get');

const isNumber = number => /^-?\d*\.?\d*$/.test(number);
const getValue = (type, defaultValue) => {
  let output = defaultValue;
  process.argv.map(item => {
    if (item.includes(type)) {
      if (['concurency', 'startIndex'].includes(type)) {
        const configArg = item.replace(`${type}=`, '');
        output = isNumber(configArg) && Number(configArg);
      } else {
        output = item.replace(`${type}=`, '');
      }
    }
  });
  return output;
};
const createValidation = (value, condiction, errorText) => {
  if (condiction) {
    console.log(redColor, `\nPlease define correct your ${errorText}`);
    console.log(
      yellowColor,
      '--------------------------------------' +
        '\nCorrectly defined command:' +
        `\nytdownload id="PLxQ30nUCB0uOatryEd7sgS0GfdMHgGvsN" output="my_output_folder" concurrency="1" startIndex="0"`
    );
    return false;
  }
  return value;
};

const validationData = [
  {
    type: 'output',
    defaultValue: path.resolve(`./`),
    isNotValid: value => value === undefined,
    errorText: 'output path where you want save your youtube songs!'
  },
  {
    type: 'id',
    defaultValue: false,
    isNotValid: value => isValidId(value),
    errorText: 'playlist youtube id, is exactly 12 or more chars!'
  },
  {
    type: 'concurrency',
    defaultValue: 1,
    isNotValid: value => !isNumber(value) || Number(value) < 0,
    errorText: 'concurency, how many songs do you want to download at once!'
  },
  {
    type: 'startIndex',
    defaultValue: 0,
    isNotValid: value => !isNumber(value) || Number(value) < 0,
    errorText: 'start index of your song from the playlist!'
  }
];

const config = {};
validationData.map(validation => {
  const { type, defaultValue, isNotValid, errorText } = validation;
  const value = getValue(type, defaultValue);
  const condiction = isNotValid(value);
  config[type] = createValidation(value, condiction, errorText);
});

const { output, id, startIndex, concurrency } = config;
if (output && id && isNumber(startIndex) && isNumber(concurrency)) {
  downloadYutubePlaylist(output, id, concurrency, startIndex);
}
