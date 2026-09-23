\# ZodiAI QVAC



ZodiAI is a local AI zodiac companion that calculates a user's zodiac sign from their birthday and generates a personalized zodiac reading using Tether QVAC.



\## Features



\- Birthday-based zodiac sign detection

\- Zodiac element display

\- Personalized local AI reading

\- Runs AI inference on-device

\- Simple responsive interface

\- No cloud AI API required



\## QVAC Integration



ZodiAI uses the Tether QVAC SDK (`@qvac/sdk`) version 0.20.0.



The app uses:



\- `loadModel()` to load the local Llama 3.2 1B model

\- `completion()` to generate the zodiac reading



The AI model runs locally through QVAC.



\## Tech Stack



\- JavaScript

\- Vite

\- Express

\- Tether QVAC

\- Llama 3.2 1B local model



\## Requirements



\- Node.js 18+

\- npm



\## Installation



Clone the repository:



```bash

git clone YOUR\_REPOSITORY\_URL

cd zodiai-qvac

