const fs = require('fs');

let stream;

module.exports = {
    createStream: fileName => {
        stream = fs.createWriteStream(fileName);
    },
    write: (data) => {
        stream.write(data);
    },
    closeStream: () => {
        stream.on('finish', () => console.log('Wrote all sentences to file.'));
        stream.end();
    }
};