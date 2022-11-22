describe("LED JSON file", () => {
	var ledStates;

	try {
		ledStates = require("./leds.json");
	} catch (err) {
		console.log("LOAD JSON FILE ERR", err);
	}

	test("Check if LED JSON is not empty", () => {
		expect(ledStates).not.toBe(null);
		expect(ledStates).not.toBe(undefined);
		expect(ledStates).not.toBe({});
	});

	test("Check if LED JSON contains correct keys", () => {
		expect(ledStates[0].source).toBe("Server");
	});
});
