import { cosmosClientSingleton } from '$lib/cosmosClient';
import { validateToken } from '$lib/auth/validateToken';
import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies }) => {
	const idToken = cookies.get('idToken') ?? '';
	try {
		const decodedToken = await validateToken(idToken);

		console.log('User requests database: ', decodedToken);
		const result = await cosmosClientSingleton.container.items.query({
			query: 'SELECT * FROM c WHERE c.id = @id', 
			parameters: [
				{ name: "@id", value: decodedToken.sub ?? '' }
			]
		}).fetchAll();
	
		return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.log('Error validating token: ', error);
		return new Response(`Error validating token:\t${error}`, { status: 401 });
	}
	
}

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};