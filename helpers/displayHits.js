module.exports = (responseHits) => {
    const { total, max_score, hits } = responseHits;
    console.log(`Total: %s`, total);
    console.log(`Max Score: %s`, max_score);
    console.log('Hits:')
    console.log('-----');
    hits.forEach((hit) => {
        const { _index, _type, _id, _score, _source } = hit;
        console.log('');
        console.log(`  _index: %s`, _index);
        console.log(`  _type: %s`, _type);
        console.log(`  _id: %s`, _id);
        console.log(`  _score: %s`, _score);
        console.log(`  _source: %O`, _source);
    });
}