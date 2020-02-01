const { db } = require('../src/dbCreator.js');
const { getWrongWords } = require('../src/util/dbAnalysis.js');

getWrongWords().forEach(word => {
    db.get('wordDescriptors')
        .remove({ word })
        .write();
});