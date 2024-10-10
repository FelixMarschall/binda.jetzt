<script lang="ts">
	import { onMount } from 'svelte';
    import type { MyEvent, MyEventsDocument } from './$types';

	let myEvents: MyEvent[] = [];
	let isLoading = true;

	onMount(async () => {
		try {
			const res = await fetch(`/events`);
			myEvents = (await res.json()).events;
		} catch (error) {
			console.error('Error fetching events:', error);
			myEvents = []; 
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="flex items-center justify-between mt-4">
  <h1 class="text-3xl font-bold">Events</h1>
  <a href="/create-event" class="btn btn-outline">Erstelle Event</a>
</div>

<div class="mt-6">
	{#if isLoading}
		<div class="flex justify-center items-center">
			<span class="loading loading-dots loading-lg"></span>
		</div>
	{:else}
		{#each myEvents as event}
			<div class="mt-4 collapse bg-base-200">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">{event.title}</div>
				<div class="collapse-content">
					<p>{event.description}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>
