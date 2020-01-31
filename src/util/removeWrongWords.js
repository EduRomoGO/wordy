const { db } = require('../dbCreator.js');
const { getWrongWords } = require('./dbAnalysis.js');

getWrongWords().forEach(word => {
    db.get('wordDescriptors')
        .remove({ word })
        .write();
});