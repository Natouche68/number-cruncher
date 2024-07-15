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

{expression}

<div class="grid grid-rows-5 grid-cols-4 gap-4">
	<Button text="C" onClick={() => (expression = "")} />
	<Button text="^" onClick={() => (expression += "^")} />
	<Button text="√" onClick={() => (expression += "√")} />
	<Button text="/" onClick={() => (expression += "/")} />

	<Button text="7" onClick={() => (expression += "7")} />
	<Button text="8" onClick={() => (expression += "8")} />
	<Button text="9" onClick={() => (expression += "9")} />
	<Button text="*" onClick={() => (expression += "*")} />

	<Button text="4" onClick={() => (expression += "4")} />
	<Button text="5" onClick={() => (expression += "5")} />
	<Button text="6" onClick={() => (expression += "6")} />
	<Button text="-" onClick={() => (expression += "-")} />

	<Button text="1" onClick={() => (expression += "1")} />
	<Button text="2" onClick={() => (expression += "2")} />
	<Button text="3" onClick={() => (expression += "3")} />
	<Button text="+" onClick={() => (expression += "+")} />

	<Button text="," onClick={() => (expression += ".")} />
	<Button text="0" onClick={() => (expression += "0")} />
	<div class="col-span-2">
		<Button text="=" onClick={calculate} />
	</div>
</div>
