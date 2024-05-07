const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const headers = {
	"Content-Type": "application/json"
}

// Fetch todo
const get = async(event) => {
	const client = new DynamoDBClient({});
	const dynamo = DynamoDBDocumentClient.from(client);

	const result = await dynamo.send(
		new GetCommand({
			TableName: "TodoTable",
			Key: {
				id: event.pathParameters.todoId,
			},
		})
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: result.Item ? "Got todo" : "Not found",
			todo: result.Item
		}),
		headers
	}
}

module.exports = {
	handler: get,
}