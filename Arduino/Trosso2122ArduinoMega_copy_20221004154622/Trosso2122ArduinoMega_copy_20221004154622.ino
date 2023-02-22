String action, pin, state;
int pins[3] = {2, 3, 4}; 
byte pinCount = sizeof(pins) / sizeof(pin[0]);

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  for(byte i = 0; i < pinCount; i++){
    pinMode(pins[i], OUTPUT);
  }
  pinMode(3, OUTPUT);
  Serial.setTimeout(200);
  Serial.println("R");
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
    }
    if(action == "setZone"){
      Serial.println(changeZone(pin));
    }
  }
}

String changeLed(String pin, String state){
  int pinInt = pin.toInt();
  int stateInt = state.toInt();

  digitalWrite(pinInt, stateInt);

  if(stateInt == 1){
    bool state = true;
    return String(pinInt) + " is " + String(state);
  }
  else if(stateInt == 0){
    bool state = false;
    return String(pinInt) + " is " + String(state);
  }
  else{
    return "Wrong format, nothing changed";
  }
}

String changeZone(String pin){
  int pinInt = pin.toInt();
  allOff();
  digitalWrite(pinInt, 1);
  return String(pinInt) + " is " + "true";
}

void allOff(){
  for(byte i = 0; i < pinCount; i++){
    changeLed(String(i), String(0));
  }
}