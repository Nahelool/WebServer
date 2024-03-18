void lightBlink(int pinNum){
  for(int i = 0; i<4; i++){
    digitalWrite(pinNum,HIGH);
    delay(500);
    digitalWrite(pinNum,LOW);
    delay(500);
  }
}
