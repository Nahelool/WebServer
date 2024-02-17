#include <ArduinoJson.h>
#include <PriUint64.h>
//Library used to print out the 38 bit long ID Code
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
//Variables initialization

const char* ssid = "Bezeq";
const char* password = "your-password";
const char* serverUrl = "http://10.0.0.8:5000/dogData";


void setup(){
  Serial.begin(9600);
  //Start serial to PC
  SerialPort.begin(9600, SERIAL_8N1, 16, 17);
  //Start serial to RFID
   WiFi.begin(ssid);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
}

void loop(){
  if (SerialPort.available() > 0) {
    t = SerialPort.read();
    //Read data from RFID scanner in ASCII form
    if (t>47){
      if (t<58){
        nextNum =  t -48;
        //Converts ASCII form to corresponding INT
      }
      if (t>64){
        nextNum = t - 55;
        //Converts ASCII form to corresponding INT
      }
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
    //Once all Integers are read, A message will appear
    Serial.println("-------------------------------");
    Serial.println("Chip Found!");
    Serial.print("Country Code : ");
    Serial.println(countryCode);
    Serial.print("ID Number : ");
    Serial.println(PriUint64<DEC>(idCode));
    Serial.println("-------------------------------");

    if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverUrl);
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
    //Sending a POST request to the web server

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.println("Error sending request");
    }

    counter = 0;
    idCode=0;
    countryCode=0;
    }
  }
}