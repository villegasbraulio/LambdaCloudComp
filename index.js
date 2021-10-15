
const { v4: uuidv4 } = require("uuid");
var AWS = require('aws-sdk');

var  handler = async ({path, pathParameters, httpMethod, body }) => {

    var dynamodb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        endpoint: 'http://dynamodb:8000',
        region: 'us-west-2',
        credentials: {
            accessKeyId: '2345',
            secretAccessKey: '2345'
        }
    });

    var docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        service: dynamodb
    });
    
    
    switch (httpMethod) {

        case 'GET':

                    const params = {
                        TableName: 'Envios',
                    };

                    try {
                        const envios = await docClient.scan(params).promise()
                        return {
                            statusCode: 200,
                            body: JSON.stringify(envios)
                        }
                    } catch (err) {
                        console.log(err)
                        return {
                            statusCode: 500
                        };
                    }
                  //eliminar pendiente
        case 'PUT':
            const idEnvio = (pathParameters || {}).idEnvio || false;
            if (idEnvio) {
            const params = {
                TableName: 'Envios',
                Key: {
                    id: idEnvio
                },
                Update: 'REMOVE pendiente',
            }
            try {
                await docClient.update(params).promise()
                return {
                    statusCode: 200,
                    body: `el envio ${idEnvio} fue entregado`
                };
            } catch {
              console.log(err)
                return;
            }
            }else{
                return {body:"no se encuentra id"}
            }
        
        case 'POST':
           
            const cParams = {
                TableName: 'Envios',
                Item: {
                    id: uuidv4(),
                    pendiente: 'si',
                    fechaAlta: new Date().toISOString(),
                    ...JSON.parse(body)
                }
            }
            try {
                await docClient.put(cParams).promise()
                return {
                    statusCode: 200,
                    body: JSON.stringify(cParams.Item)
                };
            } catch {
                return {
                    statusCode: 500,                   
                };
            }
            
        default:
            return {
                statusCode: 500,
                body: `Metodo ${httpMethod} no soportado`
            };
    }
}

exports.handler = handler;