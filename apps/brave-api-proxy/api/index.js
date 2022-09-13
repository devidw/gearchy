import express from 'express'



const app = express()

app.get('/submit', async (req, res) => {
  const url = req.query.url
  if (!url) {
    res.status(400).send('url query param required')
    return
  }

  const response = await fetch(
    `https://search.brave.com/api/goggles/submit?url=${url}`,
    {
      method: 'POST',
    },
  )

  res.status(response.status).send(await response.text())
})

export default app
