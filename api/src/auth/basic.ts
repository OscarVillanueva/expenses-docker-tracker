import { decodeBase64 } from "jsr:@std/encoding/base64";

export const validate = (secret: string)=> {
  const token = Deno.env.get("BASIC_AUTH_TOKEN") || ""

  if(token !== secret) return null

  const content = decodeBase64(secret); 
 
  return content.split(":")[0]
}
