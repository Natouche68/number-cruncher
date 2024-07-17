<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let text: string;
	export let style: "normal" | "primary" | "special";

	const dispatch = createEventDispatcher();

	let animating = false;

	function onClick() {
		animating = true;

		dispatch("click");

		setTimeout(() => {
			animating = false;
		}, 400);
	}
</script>

<button
	class="w-full
		p-4
		{style === 'primary'
		? 'elevated-indigo-dye'
		: style === 'special'
			? 'elevated-teal'
			: 'elevated-space-cadet'}
		rounded-xl
		{animating ? 'squishy-button' : ''}"
	on:click={onClick}
>
	{text}
</button>

<style lang="postcss">
	.squishy-button {
		animation: 0.4s ease squishing;
	}

	@keyframes squishing {
		0%,
		100% {
			transform: scaleX(1) scaleY(1);
		}

		66% {
			transform: scaleX(0.9) scaleY(1.1);
		}

		33% {
			transform: scaleX(1.1) scaleY(0.9);
		}
	}
</style>
