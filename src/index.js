const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const headers = {
	"Content-Type": "application/json"
}

const dashboard = async(event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Welcome to Serverless Todo app"
		})
	}
}

// Fetch all todo
const index = async(event) => {
	const client = new DynamoDBClient({});
	const dynamo = DynamoDBDocumentClient.from(client);

	const response = await dynamo.send(
		new ScanCommand({ TableName: "TodoTable" })
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Get All Todos",
			todos: response.Items
		}),
		headers
	}
}

module.exports = {
	dashboard: dashboard,
	index: index
}