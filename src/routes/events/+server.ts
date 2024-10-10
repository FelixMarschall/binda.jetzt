import { cosmosClientSingleton } from '$lib/cosmosClient';
import type { RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ request, locals }) => {
	const decodedToken = locals.jwtPayload;
	// console.log('User requests database: ', decodedToken);
	const result = await cosmosClientSingleton.containerMyEvents.items.query({
		query: 'SELECT * FROM c WHERE c.id = @id', 
		parameters: [
			{ name: "@id", value: decodedToken.sub ?? '' }
		]
	}).fetchAll();
	return new Response(JSON.stringify(result.resources[0]), { headers: { 'Content-Type': 'application/json' } });
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const decodedToken = locals.jwtPayload;
	const body = await request.json();
	// console.log('User requests database: ', decodedToken);
	const result = await cosmosClientSingleton.containerMyEvents.items.query({
		query: 'SELECT * FROM c WHERE c.id = @id', 
		parameters: [
			{ name: "@id", value: decodedToken.sub ?? '' }
		]
	}).fetchAll();

	return new Response(JSON.stringify(result.resources[0]), { headers: { 'Content-Type': 'application/json' } });
}

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};