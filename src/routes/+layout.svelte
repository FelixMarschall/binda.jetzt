<script>
	import '../app.css';
	import Page from './+page.svelte';

	let isMenuOpen = false;
	const currentYear = new Date().getFullYear();

	export let data;
</script>
<html lang="de" data-theme="cupcake"></html>
<div class="min-h-screen flex flex-col items-center">
	<div class="navbar bg-base-100 mx-auto max-w-6xl p-4 flex justify-between items-center">
		<div class="flex-1">
			<a class="btn btn-ghost text-2xl" href="/">BinDa.jetzt</a>
		</div>
		
		<div class="flex-none gap-2">
			<!-- <input type="checkbox" value="dracula" class="toggle theme-controller" /> -->
			{#if data.user}
				<a class="btn btn-ghost text-xl" href="/account" data-sveltekit-preload-data>Account</a>
			{:else}
				<a class="btn btn-ghost text-xl" href="/signin">Anmelden</a>
			{/if}
			<!-- <a class="btn btn-ghost text-l" href="/settings" >Einstellungen</a> -->
		</div>
	</div>
	<!-- Main Content -->
	<main class="flex-grow container mx-auto max-w-6xl p-4">
		<!-- {#if data.user}
			<p>Willkommen, {data.user.given_name || data.user.name}!</p>
		{:else}
			<a href="/signin">Anmelden</a>
		{/if} -->
		<!-- <pre>{JSON.stringify(data.user, null, 2)}</pre> -->
		<slot />
	</main>

	<!-- Footer -->
	<footer class="footer bg-base-200 text-base-content p-10">
		<aside>
			<!-- <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p> -->
		</aside>

		<div>
			<h6 class="footer-title text-xl" style="opacity: 1;">Kontakt</h6>
			<p>Wir freuen uns über deine Nachricht!</p>
			<a href="mailto:kontakt@softghost.dev" class="underline">kontakt@binda.jetzt</a>
		</div>
		<!-- <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav> -->
		<nav>
			<h6 class="footer-title">Legal</h6>
			<a class="link link-hover" href="/impressum">Impressum</a>
			<a class="link link-hover" href="/datenschutz">Datenschutz</a>
			<!-- <a class="link link-hover">Cookie policy</a> -->
			{#if data.user}
				<a class="link link-hover" href="/logout">Abmelden</a>
			{:else}
				<a class="link link-hover" href="/signin">Anmelden</a>
			{/if}
		</nav>
	</footer>
</div>
