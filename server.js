import express from 'express'
import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion
} from '@qvac/sdk'

const app = express()
const PORT = 3000

app.use(express.json())

// Allow the Vite frontend to communicate with this local server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

let modelId = null

async function getModel() {
  if (modelId) {
    return modelId
  }

  console.log('Loading QVAC model...')

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (progress) => {
      console.log(`QVAC model: ${progress.percentage.toFixed(0)}%`)
    }
  })

  console.log('QVAC model loaded:', modelId)

  return modelId
}

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ZodiAI',
    engine: 'Tether QVAC',
    localAI: true
  })
})

app.post('/api/reading', async (req, res) => {
  try {
    const { sign, element, birthday } = req.body

    if (!sign || !element || !birthday) {
      return res.status(400).json({
        error: 'Missing zodiac information.'
      })
    }

    console.log(`Generating QVAC reading for ${sign}...`)

    const model = await getModel()

    const result = completion({
      modelId: model,
      history: [
        {
          role: 'user',
          content: `Create a short zodiac reading for entertainment.

Zodiac sign: ${sign}
Element: ${element}
Birthday: ${birthday}

Use exactly these four headings:

PERSONALITY
STRENGTH
CHALLENGE
ADVICE

Write 1 short paragraph under each heading.
Keep the entire response under 180 words.
Be friendly, positive, and easy to understand.
Do not use markdown symbols such as **, ##, or bullet points.
Do not claim astrology is scientifically proven.
`
        }
      ],
      stream: true
    })

    let reading = ''

    for await (const token of result.tokenStream) {
      reading += token
    }

    console.log('QVAC reading complete.')

    res.json({
      reading: reading.trim()
    })
  } catch (error) {
    console.error('QVAC ERROR:', error)

    res.status(500).json({
      error: error?.message || 'QVAC inference failed.'
    })
  }
})

app.listen(PORT, '127.0.0.1', () => {
  console.log('')
  console.log('================================')
  console.log(' ZodiAI QVAC SERVER')
  console.log('================================')
  console.log(` API: http://127.0.0.1:${PORT}`)
  console.log(' QVAC: ON-DEVICE')
  console.log('================================')
  console.log('')
})