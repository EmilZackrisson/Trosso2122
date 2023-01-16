const LedCard = ({ led, serialStatus, Config, controlLed }) => {
  var classes = "  ";
  var disabled = false;
  var state;
  var toState;

  if (led.state) {
    state = "PÅ";
    toState = "SLÅ AV";
    classes = classes + " card-shadow ";
  } else {
    state = "AV";
    toState = "SLÅ PÅ";
  }
  if (serialStatus.includes("🟥") && !Config.demo) {
    disabled = true;
    toState = toState + " (Disabled)";
  } else if (led.disabled === true) {
    disabled = true;
    toState = toState;
  }

  if (led.source === "Server") return <> </>;

  return (
    <div
      className={
        classes + "led bg-accent text-white p-5 m-5 rounded-lg grid grid-rows-5"
      }
      key={led.id}
    >
      <p> Namn: {led.name} </p> <p> Tillstånd: {state} </p>{" "}
      <p> Pin: {led.id} </p> <p> {led.info} </p>
      <button
        className="btn p-2 bg-aqua rounded-lg disabled:bg-red-700"
        onClick={(e) => {
          if (!led.disabled) {
            controlLed(led);
          }
        }}
        disabled={disabled}
      >
        {toState}{" "}
      </button>{" "}
    </div>
  );
};

export default LedCard;
