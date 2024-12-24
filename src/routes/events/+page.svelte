<script lang="ts">
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
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
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return format(date, 'dd.MM.yyyy HH:mm'); // Customize the format as needed
	}
</script>

<div class="flex items-center justify-between mt-4">
	<h1 class="text-3xl font-bold">Events</h1>
	<!-- svelte-ignore missing-declaration -->
	<button class="btn" on:click={() => create_new_event_modal.showModal()}
		>Erstelle neues Event</button
	>
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
				<div class="collapse-title text-xl font-medium">
					<div class="flex items-center justify-between">
						<span class="badge mr-4 badge-success">Aktiv</span>
						{#if event.date}
							<span class="text-base">{formatDate(event.date)}</span>
							<span class="ml-4">{event.title}</span>
						{:else}
							<span class="text-base">Kein Datum</span>
							<span class="ml-12">{event.title}</span>
						{/if}
						{#if event.location}
							<span class="text-sm text-gray-500 ml-auto -mr-8">📍{event.location}</span>
						{/if}
					</div>
				</div>
				<div class="collapse-content">
					<div class="flex items-center justify-between">
						<button class="btn btn-outline btn-neutral">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
								/>
							</svg>
							Teilnehmer anzeigen
							<!-- <div class="badge badge-secondary">+99</div> -->
						</button>
						<button class="btn btn-outline btn-neutral"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
								/>
							</svg>
							Bearbeiten</button
						>
						<!-- {#if event.description}
						<p>{event.description}</p>
					{:else}
						<p>Keine Beschreibung</p>
					{/if} -->
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<dialog id="create_new_event_modal" class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<h3 class="text-lg font-bold">Neues Event</h3>
		<div class="modal-action justify-start">
			<form method="dialog">
				<!-- <div class="form-control">
					<label for="title" class="label">
					  <span class="label-text">Titel</span>
					</label>
					<input type="text" id="title" name="title" class="input input-bordered" required />
				  </div>
				  
				  <div class="form-control">
					<label for="description" class="label">
					  <span class="label-text">Beschreibung</span>
					</label>
					<textarea id="description" name="description" class="textarea textarea-bordered" required></textarea>
				  </div>
				  
				  <div class="form-control">
					<label for="date" class="label">
					  <span class="label-text">Datum</span>
					</label>
					<input type="date" id="date" name="date" class="input input-bordered" required />
				  </div>
				  
				  <div class="form-control">
					<label for="location" class="label">
					  <span class="label-text">Ort</span>
					</label>
					<input type="text" id="location" name="location" class="input input-bordered" />
				  </div> -->
				<button class="btn">Abbruch</button>
			</form>
		</div>
	</div>
</dialog>

<!-- <style>
	@media (hover: hover) {
		@supports (color: color-mix(in oklab, black, black)) {
			.collapse:hover {
				background-color: color-mix(
					in oklab,
					oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,
					black
				);
				border-color: color-mix(
					in oklab,
					oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,
					black
				);
			}
		}
	}
</style> -->
