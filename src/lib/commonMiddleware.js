const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpEventNormalizer = require('@middy/http-event-normalizer');

module.exports = (handler) => middy(handler)
    .use([
        httpJsonBodyParser(),
        httpEventNormalizer()
    ]);