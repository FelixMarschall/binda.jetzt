import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request, cookies }) => {
	request.headers.get('user');
	console.log(cookies.getAll());
	return json(cookies.getAll());
};

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};