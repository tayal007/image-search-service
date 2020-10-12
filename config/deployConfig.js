exports.envConfig = {
    "dev": {
        logPath:'./logs/',
        logs: {
            transports: [
                {name: 'image-search-service-error-file', level: 'error', filename: './logs/image-search-service-error-logs.log'},
                {name: 'image-search-service-info-file', level: 'info', filename: './logs/image-search-service-info-logs.log'}
            ],
            console: true
        },
        // Put AWS ES domain for dev environment
        elasticSearchUrl: '',
        elasticSearchIndex: 'image-metadata-dev',
        awsCredProfile: 'image-search-service-dev',
        awsCredFilePath: __dirname.replace(/config$/,'') + 'aws-credentials',
        imagesMetadataFilePath: __dirname.replace(/config$/,'') + 'test/images-metadata.json',
        accessLogs: {filename: './logs/image-search-service-access-logs.log'},
        httpPort: 80
    },

    "prod": {
        logPath:'./logs/',
        logs: {
            transports: [
                {name: 'image-search-service-error-file', level: 'error', filename: './logs/image-search-service-error-logs.log'},
                {name: 'image-search-service-info-file', level: 'info', filename: './logs/image-search-service-info-logs.log'}
            ],
            console: true
        },
        // Put AWS ES domain for prod environment
        elasticSearchUrl: '',
        elasticSearchIndex: 'image-metadata-prod',
        awsCredProfile: 'image-search-service-prod',
        awsCredFilePath: __dirname.replace(/config$/,'') + 'aws-credentials',
        imagesMetadataFilePath: __dirname.replace(/config$/,'') + 'test/images-metadata.json',
        accessLogs: {filename: './logs/image-search-service-access-logs.log'},
        httpPort: 80
    },
};