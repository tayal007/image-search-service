# Image Search Service
This Image Search Service allows user to search in the image database through an interactive web-portal. 
The service uses AWS Elastic Search to query on the image database. 
The service loads 20 images initially on the web-portal. 
The portal supports infinite scrolling. When a user queries only the first 20 results are loaded on the page. Upon scrolling down next 20 results are loaded and so on. 
The portal also displayed total number of results found. 
The portal displays user-friendly messages in case of zero search results or unexpected errors.
The backend is written in Javascript.  

## System Dependencies
Ensure following dependencies are present before installing the application.
1. ```AWS Elastic Search Domain 7.x``` for storing and querying the image data. Ensure that ```master user and password``` are provided to the application, and it has the permission to ```Create``` and ```Query``` over indices.

## Installation of service

### Local environment
1. Make sure ```node 8.x or higher``` and ```npm 6.x``` is installed.
2. Find ```deployConfig.js``` file inside ```config``` folder and put the AWS Elastic Search domain against ```elasticSearchUrl``` key in ```dev``` config. Rest details need not be changed.
3. Find ```aws-credentials``` file in the project directory and put master username and password under ```image-search-service-dev``` tag. The fields are self-explanatory.
    ```
   es_username = 
   es_password = 
   ```
4. Checkout the Project directory in terminal and run ```npm install ```.
5. Run ```npm start``` after the npm packages are installed successfully.
6. The server will start and create an index named ```image-metadata-dev``` on the ES domain and add a few data points to it from ```test/images-metadata.json``` file.
7. Open ```127.0.0.1``` in browser (The Latest Chrome version), and the application will be ready to use.
8. Application logs can be found inside ```logs``` folder.

### Production environment
1. Make sure ```node 8.x or higher``` and ```npm 6.x``` is installed.
2. Find ```deployConfig.js``` file inside ```config``` folder and put the AWS Elastic Search domain against ```elasticSearchUrl``` key in ```prod``` config. Rest details need not be changed.
3. Find ```aws-credentials``` file in the project directory and put master username and password under ```image-search-service-prod``` tag. The fields are self-explanatory.
    ```
   es_username = 
   es_password = 
   ```
4. Checkout the Project directory in terminal and run ```npm install ```.
5. Export env variable using command ```export NODE_ENV=prod```.
6. Run ```npm start``` after the npm packages are installed successfully.
7. The server will start and create an index named ```image-metadata-prod``` on the ES domain and add a few data points to it from ```test/images-metadata.json``` file.
8. Application logs can be found inside ```logs``` folder.
