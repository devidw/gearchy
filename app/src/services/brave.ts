/**
 * Make a post request to https://search.brave.com/api/goggles/submit?url= with encoded url
 */
export const useBrave = () => ({
  submitGoggle: async function (url: string) {
    const res = await fetch(
      `https://search.brave.com/api/goggles/submit?url=${encodeURIComponent(
        url,
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res.json()
  },
})
