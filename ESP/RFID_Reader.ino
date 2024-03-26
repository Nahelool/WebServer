#include <ArduinoJson.h>
#include <HardwareSerial.h>
//UART communication on GPIO Pins
#include <WiFi.h>
#include <HTTPClient.h>

HardwareSerial SerialPort(2);
//UART2 , Meaning Pin 16 and 17 are used

int t;
int nextNum;
int counter = 0;
int countryCode =0;
uint64_t idCode =0;
int ipD3 = 5;
int ipD2 = 4;
int ipD1 = 19;
int ipD0 = 15;
int receivedLight = 33; 
int errorLight = 14;
int pendingLight = 26;

const char* ssid = "Bezeq";  
//Variables initialization


void setup(){
  Serial.begin(9600);
  //Start serial to PC
  SerialPort.begin(9600, SERIAL_8N1, 16, 17);
  //Start serial to RFID
  pinMode(ipD0, INPUT);
  pinMode(ipD1, INPUT);
  pinMode(ipD2, INPUT);
  pinMode(ipD3, INPUT);
  pinMode(receivedLight, OUTPUT);
  pinMode(errorLight, OUTPUT);
  pinMode(pendingLight, OUTPUT);


   WiFi.begin(ssid);
  digitalWrite(errorLight, HIGH);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  digitalWrite(errorLight, LOW);
  lightBlink(receivedLight);
}

void loop(){
  if (SerialPort.available() > 0) {
    t = SerialPort.read();
    //Read data from RFID scanner
    if (t>47){
      nextNum = convertToInt(t);
      counter=counter+1;
      if (counter<5){
        countryCode=countryCode<<4;
        countryCode=countryCode|nextNum;
        //First 4 INTs sent are CountryCode
      }
      else{
        idCode  = idCode<<4;
        idCode = idCode|nextNum;
        //Other INTs are idCode
      }
    }
  }
  if (counter == 14){
    digitalWrite(pendingLight,HIGH);
    if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    int D0 = digitalRead(ipD0);
    int D1 = digitalRead(ipD1);
    int D2 = digitalRead(ipD2);
    int D3 = digitalRead(ipD3);

    http.begin(getURL(D3,D2,D1,D0));
    http.addHeader("Content-Type", "application/json");
  
        // Create a JSON document
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["chipNum"] = 1;
    jsonDoc["countryCode"] = countryCode;
    jsonDoc["idCode"] = idCode;

    // Serialize JSON document to a string
    String jsonString;
    serializeJson(jsonDoc, jsonString);
    
    int httpResponseCode = http.POST(jsonString);
    
    digitalWrite(pendingLight,LOW);
    
    if (httpResponseCode > 0) {
      digitalWrite(receivedLight,HIGH);
      delay(2000);
      digitalWrite(receivedLight,LOW);
    } else {
      digitalWrite(errorLight,HIGH);
      delay(2000);
      digitalWrite(errorLight,LOW);      
    }
    counter = 0;
    idCode=0;
    countryCode=0;
    }
  }
}
