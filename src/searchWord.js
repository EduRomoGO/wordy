const { scrap } = require('./scrap/scrap.js')
const axios = require('axios')

const getWordHtml = (word) => {
    const url = `https://www.wordreference.com/definition/${word}`;

    try {
        return axios.get(url);
    } catch (error) {
        throw new Error(`Error while fetching "${word}" data from ${url}: ${error}`);
    }
};


const searchWord = async word => {
    const { data: html } = await getWordHtml(word);

    return scrap(html, word);
}

// searchWord('romantic').then(data => console.log(data));

module.exports = { searchWord };

