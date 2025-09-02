import { API_KEY } from 'astro:env/server'
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  updateAccumulated: defineAction({
    input: z.object({
      uuid: z.string(),
      name: z.string(),
      total: z.number()
    }),
    handler: async ({ uuid, name, total }) => {
      try {
        const raw = await fetch(`http://backend:8000/accumulated/${uuid}`, {
          method: "PUT",
          headers: {
            "Authorization": `Basic ${API_KEY}`
          },
          body: JSON.stringify({ name, total })
        })

        const json = await raw.json()
        return json
      } catch (error) {
        console.log(error)
        return null
      }
    }
  })
}
