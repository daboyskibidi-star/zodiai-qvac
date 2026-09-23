import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion
} from '@qvac/sdk'

console.log('Starting QVAC test...')

try {
  console.log('Loading model...')

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      console.log(`Model: ${p.percentage.toFixed(0)}%`)
    }
  })

  console.log('Model loaded:', modelId)

  const result = completion({
    modelId,
    history: [
      {
        role: 'user',
        content: 'Say hello in one short sentence.'
      }
    ],
    stream: true
  })

  let answer = ''

  for await (const token of result.tokenStream) {
    answer += token
    process.stdout.write(token)
  }

  console.log('\n')
  console.log('QVAC TEST COMPLETE')
} catch (error) {
  console.error('QVAC TEST FAILED')
  console.error(error)
}