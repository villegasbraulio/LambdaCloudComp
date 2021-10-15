# LambdaCloudComp
TP3 Computación en la Nube

1- docker container rm dynamodb

2- docker network create awslocal

3- docker run -p 8000:8000 --network awslocal --name dynamodb amazon/dynamodb-local:1.16.0 -jar DynamoDBLocal.jar -sharedDb

4- abrir el shell de dynamo http://localhost:8000/shell/

5- copiar y ejecutar el contenido de tabla_envios en el shell

6- sam local start-api --docker-network awslocal

