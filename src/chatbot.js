export async function Sendmessage(message) {
	const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
	const options = {
		method: 'POST',
		headers: {
			'x-rapidapi-key': 'a9609d21d8msh41b88cddc62daa4p1c2f9djsn0d2dca60a551',
			'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			messages: [
				{
					role: 'user',
					content: message
				}
			],
			system_prompt: '',
			temperature: 0.9,
			top_k: 5,
			top_p: 0.9,
			max_tokens: 256,
			web_access: false
		})
	};

	try {
		const response = await fetch(url, options);
		const res = await response.json();
		console.log(res.result);
		return res.result;
	} catch (error) {
		console.error('Error:', error);
		return 'An error occurred. Please try again.';
	}
}
