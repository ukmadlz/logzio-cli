
const debug = require('./debug');

module.exports = (responseHits) => {
    const { total, max_score, hits } = responseHits;
    debug.log(`Total: %s`, total);
    debug.log(`Max Score: %s`, max_score);
    debug.log('Hits:')
    debug.log('-----');
    hits.forEach((hit) => {
        const { _index, _type, _id, _score, _source } = hit;
        debug.log('');
        debug.log(`  _index: %s`, _index);
        debug.log(`  _type: %s`, _type);
        debug.log(`  _id: %s`, _id);
        debug.log(`  _score: %s`, _score);
        debug.log(`  _source: %O`, _source);
    });
}