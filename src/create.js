// Create Todo
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4 } = require('uuid')
const headers = {
	"Content-Type": "application/json"
}

const create = async(event) => {

	const client = new DynamoDBClient({});
	const dynamo = DynamoDBDocumentClient.from(client);
	const id = v4()
	const createdAt = new Date().toDateString()
	const { todo } = JSON.parse(event.body)
	const completed = false

	const newTodo = {
		id,
		todo,
		createdAt,
		completed
	}

	try {
		if (todo) {
			await dynamo.send(
				new PutCommand({
					TableName: "TodoTable",
					Item: newTodo,
				})
			);

			return {
				statusCode: 200,	
				body: JSON.stringify({
					message: "Todo successfully created",
				}),
				headers
			}
		} else {
			throw new Error("Todo not defined")
		}
	} catch(err) {
		return {
			statusCode: 422,
			body: JSON.stringify({
				message: "Something went wrong...",
				error: err
			}),
			headers
		}
	}
}

module.exports = {
	handler: create
}