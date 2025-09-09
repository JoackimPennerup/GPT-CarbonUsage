# GPT-CarbonUsage

A simple browser extension that estimates carbon dioxide emissions for a ChatGPT session.

## How it works

- Injects a banner with a cloud icon at the top-right of the ChatGPT UI.
- Tracks how long ChatGPT spent "thinking" by reading the "Thought for N s" buttons on each message.
- Applies the formula `CO₂ (g) = Wh × (300/1000)` assuming ~1.3 Wh/minute of server energy use (~0.40 g per minute).

## Install

1. Clone this repository.
2. In Chrome, open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder.
4. Open ChatGPT and watch the CO₂ indicator update as the model generates responses.
