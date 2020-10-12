const schema = {
    type: 'object',
    properties: {
        imageType: {
            type: 'string',
            enum: ["png", "jpeg", "all", "none"],
            default: "all"
        },
        imageDesc: {
            type: 'string',
            minLength: 1,
        },
        minImageSize: {
            type: 'number',
            minimum: 0,
            default: 0,
        },
        maxImageSize: {
            type: 'number',
            minimum: 0,
        },
        page: {
            type: 'integer',
            minimum: 1,
            default: 1
        }
    },
};

module.exports = schema;