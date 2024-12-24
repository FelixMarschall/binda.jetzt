<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	onMount(() => {
			if (data.user) {
				goto('/events');
			}
		});
</script>

{#if data.user}
	<div class="hero min-h-1/2 bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Willkommen, {data.user.given_name || data.user.name}!</h1>
				<p class="py-6">
					Wir freuen uns, Sie wiederzusehen. Entdecken Sie unsere neuesten Funktionen und Angebote.
				</p>
				<a class="btn btn-primary text-xl" href="/events">Meine Events</a>
			</div>
		</div>
	</div>
{:else}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Willkommen bei BinDa.jetzt!</h1>
				<p class="py-6">Bitte melden Sie sich an, um fortzufahren und unsere Dienste zu nutzen.</p>
				<a href="/signin" class="btn btn-primary">Anmelden</a>
			</div>
		</div>
	</div>
{/if}
