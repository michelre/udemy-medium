const cheerio = require('cheerio');
const R = require('ramda');

module.exports = {
  extractDescription(content) {
    if (!content) return null;
    const $ = cheerio.load(content);
    return $.text();
  },

  extractImage(content) {
    if (!content) return null;
    const $ = cheerio.load(content);
    if (!$('img')[0]) return null;
    return $('img')[0].attribs['src'];
  },
};
