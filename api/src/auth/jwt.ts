import {
  verify,
  decode,
  Payload,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";

export const jwt = {
  validate: async (token: string): Promise<Payload | null> => {
    try {
      const t = token.replace("Bearer ", "");

      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(Deno.env.get("SUPABASE_JWT")),
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["verify"]
      );

      const payload = await verify(t, key);

      return payload;
    } catch (error) {
      console.log({ error });

      return null;
    }
  },
  interpret: (token: string): unknown => {
    const [, payload] = decode(token);

    return payload;
  },
};
