String action, pin, state;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  for(int i=2; i<=4; i++){
    pinMode(i, OUTPUT);
  }
  pinMode(3, OUTPUT);
  Serial.setTimeout(200);
  Serial.println("Enter data:");
}

void loop() {
  while (Serial.available() > 0) {
    action = Serial.readStringUntil(',');  // writes in the string all the inputs till a comma
    Serial.read();
    pin = Serial.readStringUntil(',');
    Serial.read();
    state = Serial.readStringUntil('\n');  // writes in the string all the inputs till the end of line character

    if(action == "set"){
      Serial.println(changeLed(pin, state));
      Serial.println("Enter data:");
    }
  }
}

String changeLed(String pin, String state){
  int pinInt = pin.toInt();
  int stateInt = state.toInt();

  digitalWrite(pinInt, stateInt);

  if(stateInt == 1){
    bool state = true;
  }
  else{
    bool state = false;
  }

  return String(pinInt) + " is " + String(state);
}