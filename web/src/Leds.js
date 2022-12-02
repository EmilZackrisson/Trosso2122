var leds = [
	{
		source: "Server",
	},
	{
		id: 13,
		state: false,
		name: "Built In",
		info: "Denna LED sitter direkt på Arduinon",
		disabled: false,
	},
	{
		id: 3,
		state: false,
		name: "Grön",
		info: "Denna LED är grön och styrs via transistor",
		disabled: true,
	},
	{
		id: 2,
		state: false,
		name: "CW LED",
		info: "Denna LED är kall vit och styrs via transistor",
		disabled: false,
	},
];

export default leds;
