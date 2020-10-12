const projectEnv = require('../config/projectEnv').projectEnv;
const bulkIndexQuery = require('../src/lib/elasticSearchBase').bulkIndexQuery;


const initESIndex = function () {
    return new Promise((resolve, reject) => {
        bulkIndexQuery({filePath: projectEnv.imagesMetadataFilePath})
            .then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
    });
};

module.exports = initESIndex;