const cheerio = require('cheerio')

const textContent = (el, $) => {
    for (let child of Array.from($(el).contents())) {
        if (child.nodeType == 3) {
            return $(child).text()
        }
    }
};

const scrap = (html) => {
    let $ = cheerio.load(html)
    let rhs = $('.entryRH')
    let currentClazzName = ''
    let definitions = []
    const getKey = () => definitions.length
    rhs.each((rhKey, rh) => {
        let clazz = $(rh).find('.rh_empos, .rh_pos')
        let ols = $(rh).find('ol')
        clazz.each((clazzKey, clazzEL) => {
            currentClazzName = $(clazzEL).text()
            //each grammar class has only one ol's
            //if you remove it, everything will get desynchronized
            if ((clazzKey + 1) > ols.length) {
                return;
            }
            let key = getKey()
            definitions[key] = { class: '', defs: [{ def: '', examples: [] }] }
            definitions[key].class = currentClazzName
            let d = $(ols[clazzKey]).find('.rh_def')
            d.each((defKey, defEL) => {
                defEL = $(defEL)
                definitions[key].defs[defKey] = { def: '', examples: [] }
                definitions[key].defs[defKey].def = textContent(defEL, $)
                defEL.find('.rh_ex').each((_, exampleEL) => {
                    definitions[key].defs[defKey].examples.push($(exampleEL).text())
                })
            })
        })
    });

    const fullData = {
        definitions,
        audio: definitions.length ? $('#aud0').children()[0].attribs.src : '',
        phonemics: definitions.length ? $('.pronWR')[0].children[1].data : '',
    };

    return fullData;
};

module.exports = { scrap };