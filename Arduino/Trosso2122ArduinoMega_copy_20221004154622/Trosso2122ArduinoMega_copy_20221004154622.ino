String action, pin, state;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.setTimeout(200);
}

void loop() {
  while (Serial.available() > 0) {
    action = Serial.readStringUntil(',');  // writes in the string all the inputs till a comma
    Serial.read();
    pin = Serial.readStringUntil(',');
    Serial.read();
    state = Serial.readStringUntil('\n');  // writes in the string all the inputs till the end of line character

    if(action == "set"){
      changeLed(pin, state);
    }
  }
}

String changeLed(String pin, String state){
  int pinInt = pin.toInt();
  int stateInt = state.toInt();

  digitalWrite(pinInt, stateInt);
  return String(pinInt) + " is " + String(stateInt);
}