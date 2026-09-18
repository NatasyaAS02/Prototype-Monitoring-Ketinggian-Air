//==========================
// PIN
//==========================
#define TRIG_PIN    5
#define ECHO_PIN    18

#define LED_MERAH   25
#define LED_KUNING  26
#define LED_HIJAU   27

#define BUZZER_PIN  19

#define SERVO_PIN   32

//==========================
// BATAS JARAK
//==========================
const float BATAS_AMAN = 30.0;
const float BATAS_SIAGA = 15.0;

//==========================

void setup()
{
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(LED_MERAH, OUTPUT);
  pinMode(LED_KUNING, OUTPUT);
  pinMode(LED_HIJAU, OUTPUT);

  pinMode(BUZZER_PIN, OUTPUT);

  pintu.attach(SERVO_PIN);
  pintu.write(0);

  Serial.println("===== TEST HC-SR04 =====");
}

//==========================

float bacaJarak()
{
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  long durasi = pulseIn(ECHO_PIN, HIGH, 30000);

  if (durasi == 0)
    return -1;

  return durasi * 0.0343 / 2.0;
}

//==========================

void loop()
{
  float jarak = bacaJarak();

  if (jarak < 0)
  {
    Serial.println("Sensor Tidak Terbaca!");

    digitalWrite(LED_HIJAU, LOW);
    digitalWrite(LED_KUNING, LOW);
    digitalWrite(LED_MERAH, LOW);

    digitalWrite(BUZZER_PIN, LOW);

    delay(500);
    return;
  }

  Serial.print("Jarak : ");
  Serial.print(jarak);
  Serial.println(" cm");

  //==========================
  // AMAN
  //==========================

  if (jarak > BATAS_AMAN)
  {
    digitalWrite(LED_HIJAU, HIGH);
    digitalWrite(LED_KUNING, LOW);
    digitalWrite(LED_MERAH, LOW);

    digitalWrite(BUZZER_PIN, LOW);

    pintu.write(0);

    Serial.println("STATUS : AMAN");
  }

  //==========================
  // SIAGA
  //==========================

  else if (jarak > BATAS_SIAGA)
  {
    digitalWrite(LED_HIJAU, LOW);
    digitalWrite(LED_KUNING, HIGH);
    digitalWrite(LED_MERAH, LOW);

    pintu.write(0);

    digitalWrite(BUZZER_PIN, HIGH);
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);

    Serial.println("STATUS : SIAGA");
  }

  //==========================
  // BAHAYA
  //==========================

  else
  {
    digitalWrite(LED_HIJAU, LOW);
    digitalWrite(LED_KUNING, LOW);
    digitalWrite(LED_MERAH, HIGH);

    pintu.write(90);

    digitalWrite(BUZZER_PIN, HIGH);

    Serial.println("STATUS : BAHAYA");
  }

  Serial.println("------------------------");

  delay(500);
}
