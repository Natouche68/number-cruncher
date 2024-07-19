<script lang="ts">
	import { slide, crossfade, fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { backInOut } from "svelte/easing";
	import * as math from "mathjs";
	import Button from "$lib/Button.svelte";

	let expression = "";
	let calculatedResult = "";
	let history: string[] = [];

	const [send, receive] = crossfade({
		duration: 400,
		easing: backInOut,
	});

	function clear() {
		expression = "";
		calculatedResult = "";
	}

	function addToExpression(toAdd: string) {
		if (calculatedResult !== "") {
			history.push(expression + calculatedResult);
			if (history.length > 6) {
				history.shift();
			}
			history = history;

			expression = "";
			calculatedResult = "";
		}

		expression += toAdd;
	}

	function calculate() {
		const expressionParts = expression.replaceAll("√", "sqrt(").split("");

		let result = "";
		let openParentheses = 0;
		expressionParts.forEach((char) => {
			if (char === "(") {
				openParentheses++;
			} else if (
				!(!isNaN(Number(char)) || char === ".") &&
				openParentheses > 0
			) {
				result += ")";
				openParentheses--;
			}

			result += char;
		});

		result += ")".repeat(openParentheses);

		calculatedResult = String(math.evaluate(result));

		expression += "=";
	}

	function getCharacterImg(character: string): string {
		switch (character) {
			case ".":
				return "dot.png";
			case "=":
				return "equal.png";
			case "+":
				return "plus.png";
			case "-":
				return "minus.png";
			case "*":
				return "multiply.png";
			case "/":
				return "divide.png";
			case "^":
				return "power.png";
			case "√":
				return "sqrt.png";
			default:
				return `${character}.png`;
		}
	}
</script>

<div class="h-dvh flex flex-col justify-end bg-raisin-black text-white">
	{#if history.length > 0}
		<div class="mx-4 border-b-2 border-light-blue">
			{#each history as historyElement (historyElement)}
				<div
					class="py-2 flex flex-row justify-end items-center"
					transition:fade={{ duration: 400, easing: backInOut }}
					animate:flip={{ duration: 400, easing: backInOut }}
				>
					{#each historyElement.split("") as character}
						<img
							src="/characters/{getCharacterImg(character)}"
							alt={character}
							class="h-4 drop-shadow"
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/if}

	<div class="h-40 flex flex-col justify-end items-end">
		{#if calculatedResult === ""}
			<div
				class="px-4 py-2 flex flex-row justify-end items-center"
				out:send={{ key: "expression" }}
			>
				{#each expression.split("") as character, i (i)}
					<img
						src="/characters/{getCharacterImg(character)}"
						alt={character}
						class="h-16 drop-shadow"
						in:slide={{ duration: 400, easing: backInOut, axis: "x" }}
					/>
				{/each}
			</div>
		{:else}
			<div
				class="px-4 py-2 flex flex-row justify-end items-center"
				in:receive={{ key: "expression" }}
			>
				{#each expression.split("") as character}
					<img
						src="/characters/{getCharacterImg(character)}"
						alt={character}
						class="h-8 drop-shadow"
					/>
				{/each}
			</div>
			<div
				class="px-4 py-2 flex flex-row justify-end items-center"
				in:fade={{ duration: 400, easing: backInOut }}
			>
				{#each calculatedResult.split("") as resultCharacter}
					<img
						src="/characters/{getCharacterImg(resultCharacter)}"
						alt={resultCharacter}
						class="h-16 drop-shadow"
					/>
				{/each}
			</div>
		{/if}
	</div>

	<div class="grid grid-rows-5 grid-cols-4 gap-4 p-4">
		<Button text="C" style="normal" on:click={clear} />
		<Button text="^" style="normal" on:click={() => addToExpression("^")} />
		<Button text="√" style="normal" on:click={() => addToExpression("√")} />
		<Button text="/" style="primary" on:click={() => addToExpression("/")} />

		<Button text="7" style="normal" on:click={() => addToExpression("7")} />
		<Button text="8" style="normal" on:click={() => addToExpression("8")} />
		<Button text="9" style="normal" on:click={() => addToExpression("9")} />
		<Button text="*" style="primary" on:click={() => addToExpression("*")} />

		<Button text="4" style="normal" on:click={() => addToExpression("4")} />
		<Button text="5" style="normal" on:click={() => addToExpression("5")} />
		<Button text="6" style="normal" on:click={() => addToExpression("6")} />
		<Button text="-" style="primary" on:click={() => addToExpression("-")} />

		<Button text="1" style="normal" on:click={() => addToExpression("1")} />
		<Button text="2" style="normal" on:click={() => addToExpression("2")} />
		<Button text="3" style="normal" on:click={() => addToExpression("3")} />
		<Button text="+" style="primary" on:click={() => addToExpression("+")} />

		<Button text="," style="normal" on:click={() => addToExpression(".")} />
		<Button text="0" style="normal" on:click={() => addToExpression("0")} />
		<div class="col-span-2">
			<Button text="=" style="special" on:click={calculate} />
		</div>
	</div>
</div>
