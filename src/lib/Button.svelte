<script lang="ts">
	export let text: string;
	export let onClick: () => void;
</script>

<button class="w-full p-4 bg-gray-500" on:click={onClick}>
	{text}
</button>
