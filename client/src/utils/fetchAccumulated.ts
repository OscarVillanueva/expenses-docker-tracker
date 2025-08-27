import { API_KEY } from 'astro:env/server'

export const fetchAccumulated = async () => {
  try {
    const raw = await fetch("http://backend:8000/accumulated", {
      method: "GET",
      headers: {
        "Authorization": `Basic ${API_KEY}`
      }
    })
    const json = await raw.json()
    return json
  } catch(error) {
    console.log("------ error -------")
    console.log(error)
    return null
  }
}
