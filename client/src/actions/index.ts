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
  }),
  createPurpose: defineAction({
    input: z.object({
      name: z.string()
    }),
    handler: async ({ name }) => {
      try {
        const raw = await fetch(`http://backend:8000/purpose`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${API_KEY}`
          },
          body: JSON.stringify({ name })
        })

        const json = await raw.json()
        return json
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }),
  updatePurpose: defineAction({
    input: z.object({
      uuid: z.string().uuid(),
      name: z.string()
    }),
    handler: async ({ uuid, name }) => {
      try {
        const raw = await fetch(`http://backend:8000/purpose/${uuid}`, {
          method: "PUT",
          headers: {
            "Authorization": `Basic ${API_KEY}`
          },
          body: JSON.stringify({ name })
        })

        const json = await raw.json()
        return json
      } catch (err) {
        console.log(err)
        return err
      }
    }
  }),
  deletePurpose: defineAction({
    input: z.object({
      uuid: z.string().uuid(),
    }),
    handler: async ({ uuid }) => {
      try {
        const raw = await fetch(`http://backend:8000/purpose/${uuid}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${API_KEY}`
          },
        })

        const json = await raw.json()
        return json
      } catch (err) {
        console.log(err)
        return err
      }
    }
  })
}
