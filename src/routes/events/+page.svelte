<script>
	import { onMount } from 'svelte';

	/** @type {Array<{ title: string, description: string }>} */
	let myEvents = [];
	let isLoading = true;

	onMount(async () => {
		try {
			const res = await fetch(`/events`);
			myEvents = await res.json();
            console.log(myEvents);
		} catch (error) {
			console.error('Error fetching events:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<h1 class="text-3xl font-bold">Events</h1>
<div class="mt-6">
	{#if isLoading}
		<div class="flex justify-center items-center">
			<span class="loading loading-dots loading-lg"></span>
		</div>
	{:else}
		<div class="mt-4 collapse bg-base-200">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">#1 Badespaß</div>
			<div class="collapse-content">
				<p>hello</p>
			</div>
		</div>
		<div class="mt-4 collapse bg-base-200">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">#2 Seminar</div>
			<div class="collapse-content">
				<p>hello</p>
			</div>
		</div>
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
