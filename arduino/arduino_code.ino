int analogPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(analogPin, INPUT);
}

void loop() {
  int potentiometerValue = analogRead(analogPin);
  String jsonString = "";

  jsonString += "[";
  jsonString += String(potentiometerValue) + ",";
  jsonString += String(polinomialCurve(potentiometerValue)) + ",";
  jsonString += String(nonPolinomialCurve(potentiometerValue));
  jsonString += "]";

  Serial.println(jsonString);
  
  delay(200);
}

float polinomialCurve(int value) {
  return -0.0000000008315 * pow(value, 4) + 0.000002426 * pow(value, 3) - 0.002468 * pow(value, 2) + 1.145 * value + 34.65;
}

float nonPolinomialCurve(int value) {
  return (9.036 + exp(2.392 + 0.00068 * value)) / (0.102 + exp(-1.135 - 0.0159 * value));
}
