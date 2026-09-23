import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="app">

    <header class="hero">
      <div class="logo">✦</div>

      <div>
        <h1>ZodiAI</h1>
        <p>LOCAL AI ZODIAC COMPANION</p>
      </div>

      <div class="qvac-badge">⚡ QVAC</div>
    </header>

    <section class="welcome">
      <span class="eyebrow">DISCOVER YOUR SIGN</span>

      <h2>
        Your birthday.<br>
        <span>Your cosmic profile.</span>
      </h2>

      <p>
        Enter your birth date and let local AI create
        a personalized zodiac reading.
      </p>
    </section>

    <section class="card">
      <label for="birthday">YOUR BIRTHDAY</label>

      <input
        type="date"
        id="birthday"
        aria-label="Your birthday"
      >

      <button id="discoverBtn">
        <span>✦</span>
        Discover My Zodiac
      </button>
    </section>

    <section id="result" class="result hidden"></section>

    <footer>
      <span>🔒 AI runs locally on your device</span>
      <span>Powered by Tether QVAC</span>
    </footer>

  </main>
`

const birthdayInput = document.querySelector('#birthday')
const discoverBtn = document.querySelector('#discoverBtn')
const result = document.querySelector('#result')

function getZodiac(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return ['Aries', '♈', 'Fire']
  }

  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return ['Taurus', '♉', 'Earth']
  }

  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return ['Gemini', '♊', 'Air']
  }

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return ['Cancer', '♋', 'Water']
  }

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return ['Leo', '♌', 'Fire']
  }

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return ['Virgo', '♍', 'Earth']
  }

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return ['Libra', '♎', 'Air']
  }

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return ['Scorpio', '♏', 'Water']
  }

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return ['Sagittarius', '♐', 'Fire']
  }

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return ['Capricorn', '♑', 'Earth']
  }

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return ['Aquarius', '♒', 'Air']
  }

  return ['Pisces', '♓', 'Water']
}

function formatReading(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^PERSONALITY$/gim, '<strong>PERSONALITY</strong>')
    .replace(/^STRENGTH$/gim, '<strong>STRENGTH</strong>')
    .replace(/^CHALLENGE$/gim, '<strong>CHALLENGE</strong>')
    .replace(/^ADVICE$/gim, '<strong>ADVICE</strong>')
    .replace(/\n/g, '<br>')
}

discoverBtn.addEventListener('click', async () => {
  if (!birthdayInput.value) {
    birthdayInput.focus()
    return
  }

  const date = new Date(`${birthdayInput.value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return
  }

  const month = date.getMonth() + 1
  const day = date.getDate()

  const [sign, symbol, element] = getZodiac(month, day)

  const birthdayText = date.toLocaleDateString('en-US')

  result.classList.remove('hidden')

  result.innerHTML = `
    <div class="zodiac-symbol">${symbol}</div>

    <span class="eyebrow">YOUR ZODIAC SIGN</span>

    <h3>${sign}</h3>

    <div class="details">

      <div>
        <small>ELEMENT</small>
        <strong>${element}</strong>
      </div>

      <div>
        <small>BIRTH DATE</small>
        <strong>${birthdayText}</strong>
      </div>

    </div>

    <div class="ai-reading">

      <div class="ai-header">
        <span>✦</span>
        <strong>LOCAL QVAC AI READING</strong>
      </div>

      <p class="loading">
        Generating your local AI reading...
      </p>

    </div>
  `

  discoverBtn.disabled = true
  discoverBtn.innerHTML = 'Generating...'

  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/reading',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          sign,
          element,
          birthday: birthdayInput.value
        })
      }
    )

    const text = await response.text()

    let data

    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(
        'The local QVAC server returned an invalid response.'
      )
    }

    if (!response.ok) {
      throw new Error(
        data.error || `Server error ${response.status}`
      )
    }

    if (!data.reading) {
      throw new Error('QVAC returned no reading.')
    }

    document.querySelector('.ai-reading').innerHTML = `
      <div class="ai-header">
        <span>✦</span>
        <strong>LOCAL QVAC AI READING</strong>
      </div>

      <div class="reading">
        ${formatReading(data.reading)}
      </div>
    `

  } catch (error) {

    console.error('ZodiAI ERROR:', error)

    document.querySelector('.ai-reading').innerHTML = `
      <div class="ai-header error-header">
        <span>⚠</span>
        <strong>AI READING ERROR</strong>
      </div>

      <p class="loading">
        ${error.message}
      </p>
    `

  } finally {

    discoverBtn.disabled = false

    discoverBtn.innerHTML = `
      <span>✦</span>
      Discover My Zodiac
    `
  }
})