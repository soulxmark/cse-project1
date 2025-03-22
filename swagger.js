const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info:{
        title:'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:3001',
    schemes:['https','http']
};

const outputfile ='./swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointFiles, doc);