const commonMiddleware = require('../lib/commonMiddleware');
const createError = require('http-errors');
const validator = require('@middy/validator');
const searchQuery = require('../lib/elasticSearchBase').searchQuery;
const searchImageSchema = require('../lib/schemas/searchImageSchema');
const logger = require('../../logger');
const projectEnv = require('../../config/projectEnv').projectEnv;

const pageSize = 20;

const searchImage = function (params) {
    let {
        imageType,
        imageDesc,
        minImageSize,
        maxImageSize,
        page
    } = params;

    if(maxImageSize === undefined || maxImageSize === null) maxImageSize = Infinity;
    if(minImageSize > maxImageSize) {
        throw new createError.BadRequest('SIZE_QUERY_ERROR');
    }
    if(imageType === "none") {
        return Promise.resolve({"datarows":[],"status":200});
    }

    let query = "select imageDesc, imageType, imageSizeInKB from " + projectEnv.elasticSearchIndex;
    const conditions = [];
    if(imageType !== "all") {
        conditions.push("imageType='" + imageType+"'");
    }
    if(imageDesc !== undefined) {
        conditions.push("imageDesc LIKE " + "'%" + imageDesc + "%'");
    }
    conditions.push("imageSizeInKB >= " + minImageSize.toString());
    if(maxImageSize !== Infinity) {
        conditions.push("imageSizeInKB <= " + maxImageSize.toString());
    }

    if(conditions.length > 0) {
        query += " where";
        for(let idx=0; idx<conditions.length-1;idx++) {
            query += " " + conditions[idx] + " and";
        }
        query += " " + conditions[conditions.length-1];
    }

    query += " LIMIT " + (pageSize*(page-1)).toString() + "," + pageSize.toString();

    return new Promise((resolve, reject) => {
        searchQuery({query}).then(result => {
            resolve(result);
        }).catch(error => {
            logger.error({'message': 'SEARCH_API_ERROR', error: error});
            reject(error);
        })
    });
};

module.exports = commonMiddleware(searchImage)
    .use(validator({inputSchema: searchImageSchema}));