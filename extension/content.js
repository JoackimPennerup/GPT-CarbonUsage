// Estimate CO2 emissions for a ChatGPT session based on thinking time.
const GRID_INTENSITY = 300; // gCO2 per kWh
const WH_PER_MIN = 1.3; // estimated server energy use per minute
const GRAMS_PER_WH = GRID_INTENSITY / 1000;
const GRAMS_PER_SECOND = (WH_PER_MIN / 60) * GRAMS_PER_WH;

let thinkingSeconds = 0;

function ensureBanner() {
  let banner = document.getElementById('gpt-carbon-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'gpt-carbon-banner';
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.right = '0';
    banner.style.zIndex = '9999';
    banner.style.background = 'rgba(255,255,255,0.9)';
    banner.style.padding = '4px 8px';
    banner.style.borderRadius = '0 0 0 4px';
    banner.style.display = 'flex';
    banner.style.alignItems = 'center';
    banner.style.gap = '4px';

    const icon = document.createElement('span');
    icon.textContent = '☁️';
    banner.appendChild(icon);

    const text = document.createElement('span');
    text.id = 'gpt-carbon-text';
    banner.appendChild(text);

    document.body.appendChild(banner);
  }
  return banner;
}

function updateBanner() {
  const banner = ensureBanner();
  const grams = thinkingSeconds * GRAMS_PER_SECOND;
  const text = banner.querySelector('#gpt-carbon-text');
  text.textContent = `CO2: ${grams.toFixed(2)} g`;
}

updateBanner();

// Scan for "Thought for" buttons to account for past and new messages.
function scanThoughtButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    if (btn.textContent.includes('Thought for') && !btn.dataset.co2Counted) {
      const match = btn.textContent.match(/Thought for\s+([\d.,]+)/i);
      if (match) {
        const seconds = parseFloat(match[1].replace(',', '.'));
        if (!isNaN(seconds)) {
          thinkingSeconds += seconds;
          btn.dataset.co2Counted = 'true';
        }
      }
    }
  });
  updateBanner();
}

setInterval(scanThoughtButtons, 1000);
