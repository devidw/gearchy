import express from 'express'

/**
 * Simple API proxy for the Brave Search Goggles API.
 *
 * GET /submit?url=... should wrap the
 * POST https://search.brave.com/api/goggles/submit?url=... endpoint (fetch from brave and
 * return fetch response).
 */

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

app.listen(3000, () => {
  console.log('Brave API proxy listening on port 3000!')
})
