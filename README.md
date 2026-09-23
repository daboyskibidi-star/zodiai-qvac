ZodiAI QVAC



A local AI zodiac companion powered by Tether QVAC.



ABOUT



ZodiAI calculates a user's zodiac sign from their birthday and generates a personalized zodiac reading using on-device AI.



FEATURES



Birthday-based zodiac sign detection

Zodiac element display

Personalized local AI reading

On-device AI inference

Responsive interface

No cloud AI API required



QVAC INTEGRATION



SDK: @qvac/sdk 0.20.0



QVAC functions used:



loadModel()

Loads the local Llama 3.2 1B model.



completion()

Generates the personalized zodiac reading.



The AI inference runs locally through Tether QVAC.



TECH STACK



JavaScript

Vite

Express

Tether QVAC

Llama 3.2 1B



REQUIREMENTS



Node.js 18+

npm



INSTALLATION



git clone https://github.com/daboyskibidi-star/zodiai-qvac.git



cd zodiai-qvac



npm install



RUN



Start the QVAC server:



node server.js



In another terminal:



npm run dev



Open:



http://127.0.0.1:5173/



HOW IT WORKS



1\. Enter a birthday.

2\. ZodiAI calculates the zodiac sign locally.

3\. The frontend sends the zodiac information to the local Express server.

4\. The server loads the QVAC local model.

5\. QVAC completion() generates the reading.

6\. The reading appears in the browser.



NOTE



Zodiac and astrology content is intended for entertainment and personal reflection. It is not presented as scientifically validated prediction.



LICENSE



MIT License.

