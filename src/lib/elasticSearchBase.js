const request = require('request');
const fs = require('fs');
const ini = require('ini');
const projectEnv = require('../../config/projectEnv').projectEnv;
const logger = require('../../logger');
const createError = require('http-errors');


const getESCredentials = function(profile) {
    const config = ini.parse(fs.readFileSync(projectEnv.awsCredFilePath, 'utf-8'));
    return {user: config[profile].es_username, pass: config[profile].es_password };
}

const searchQuery = function(params) {
    try {
        const {query} = params;
        const url = projectEnv.elasticSearchUrl + "/_opendistro/_sql";
        const options = {
            method: 'POST',
            body: {query},
            json: true,
            url: url,
            timeout: 5000,
        };
        logger.info(options);

        const credentials = getESCredentials(projectEnv.awsCredProfile);
        options.auth = {user: credentials.user, pass: credentials.pass, sendImmediately: true};

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) {
                    logger.error({'message': error, 'stack': error.stack});
                    reject(error);
                } else if (response.statusCode === 200) {
                    resolve(body);
                } else if(response.statusCode === 401) {
                    reject(new createError["400"]({message: 'SEARCH_UNSUCCESSFUL', error: 'Unauthorized'}));
                } else {
                    reject(new createError["400"]('SEARCH_UNSUCCESSFUL'));
                }
            });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

const bulkIndexQuery = function(params) {
    try {
        const {filePath} = params;
        const url = projectEnv.elasticSearchUrl + "/_bulk";
        const options = {
            encoding: null
        }

        const credentials = getESCredentials(projectEnv.awsCredProfile);
        options.auth = {user: credentials.user, pass: credentials.pass, sendImmediately: true};

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath, {encoding: 'binary'})
                .pipe(
                    request.post(url, options, function (error, response) {
                        if (error) {
                            logger.error({'message': error, 'stack': error.stack});
                            reject(error);
                        } else if (response.statusCode === 200) {
                            resolve('INDEXING_SUCCESSFUL');
                        } else if(response.statusCode === 401) {
                            reject(new createError["400"]({message: 'SEARCH_UNSUCCESSFUL', error: 'Unauthorized'}));
                        } else {
                            reject(new createError["400"]('INDEXING_UNSUCCESSFUL'));
                        }
                    })
                );
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

exports.searchQuery = searchQuery;
exports.bulkIndexQuery = bulkIndexQuery;

