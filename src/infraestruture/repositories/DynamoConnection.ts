import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const config: DynamoDBClientConfig = {
    region: process.env.AWS_REGION
}
const client = new DynamoDBClient(config);

export default client;