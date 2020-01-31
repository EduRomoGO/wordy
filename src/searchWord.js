// [ ] comprobar que se hace correctamente, o que si da errores indique porque

const scrap = require('./scrap.js')
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
    const html = await getWordHtml(word);

    return scrap(html);
}

console.log(searchWord('romantic'));

module.exports = { searchWord };

