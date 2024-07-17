<script lang="ts">
	import * as math from "mathjs";
	import Button from "$lib/Button.svelte";

	let expression = "";

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

		console.log(result);

		expression = math.evaluate(result);
	}
</script>

<div class="flex flex-col justify-end bg-raisin-black text-white h-dvh">
	{expression}

	<div class="grid grid-rows-5 grid-cols-4 gap-4 p-4">
		<Button text="C" style="normal" on:click={() => (expression = "")} />
		<Button text="^" style="normal" on:click={() => (expression += "^")} />
		<Button text="√" style="normal" on:click={() => (expression += "√")} />
		<Button text="/" style="primary" on:click={() => (expression += "/")} />

		<Button text="7" style="normal" on:click={() => (expression += "7")} />
		<Button text="8" style="normal" on:click={() => (expression += "8")} />
		<Button text="9" style="normal" on:click={() => (expression += "9")} />
		<Button text="*" style="primary" on:click={() => (expression += "*")} />

		<Button text="4" style="normal" on:click={() => (expression += "4")} />
		<Button text="5" style="normal" on:click={() => (expression += "5")} />
		<Button text="6" style="normal" on:click={() => (expression += "6")} />
		<Button text="-" style="primary" on:click={() => (expression += "-")} />

		<Button text="1" style="normal" on:click={() => (expression += "1")} />
		<Button text="2" style="normal" on:click={() => (expression += "2")} />
		<Button text="3" style="normal" on:click={() => (expression += "3")} />
		<Button text="+" style="primary" on:click={() => (expression += "+")} />

		<Button text="," style="normal" on:click={() => (expression += ".")} />
		<Button text="0" style="normal" on:click={() => (expression += "0")} />
		<div class="col-span-2">
			<Button text="=" style="special" on:click={calculate} />
		</div>
	</div>
</div>
