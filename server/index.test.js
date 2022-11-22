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

	test("Check if LEDS in JSON contains correct keys", () => {
		// Removes first element in array
		ledStates.splice(0, 1);

		ledStates.map((led) => {
			expect(led.id).not.toBeNaN();
			expect(led.id).not.toBe(null);
			expect(led.state).toBeFalsy();
			expect(led.name).not.toBe(null);
			expect(typeof led.name).toBe("string");
			expect(typeof led.disabled).toBe("boolean");
		});
	});

	test("Check if LEDS in JSON has correct pin", () => {
		ledStates.map((led) => {
			expect(led.id).toBeLessThanOrEqual(53);
			expect(led.id).toBeGreaterThanOrEqual(2);
		});
	});
});
