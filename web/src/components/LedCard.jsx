const LedCard = ({ led, controlLed }) => {
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

  if (led.source === "Server") return <> </>;

  return (
    <div
      className={
        classes + "led bg-secondary text-white p-5 m-5 rounded-lg flex flex-col"
      }
      id={led.id}
      key={led.id}
    >
      <p> Namn: {led.name} </p> <p> Tillstånd: {state} </p>
      <p> Pin: {led.id} </p> <p> {led.info} </p>
      <button
        className="btn p-2 bg-aqua rounded-lg disabled:bg-red-700 justify-self-end"
        // id={led.id}
        type="button"
        onClick={(e) => {
          if (!led.disabled) {
            controlLed(led);
          }
        }}
        disabled={disabled}
      >
        {toState}
      </button>
    </div>
  );
};

export default LedCard;
