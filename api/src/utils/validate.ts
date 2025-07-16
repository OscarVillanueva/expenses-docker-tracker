import { z, ZodError } from "https://deno.land/x/zod@v3.22.2/mod.ts";

import { Response } from "../types/Response.ts";
import { Status } from "@oak/oak";

type Params = {
  data: object;
  schema: z.ZodSchema;
};

type ValidationResponse = {
  message: string;
  [key: string]: unknown;
};

export const validate = ({
  data,
  schema,
}: Params): Response<ValidationResponse> => {
  try {
    schema.parse(data);

    return {
      success: true,
      data: {
        status: Status.Accepted,
        message: "Valid body",
      },
    };
  } catch (err) {
    const error = err as ZodError;

    return {
      success: false,
      data: {
        status: Status.UnprocessableEntity,
        message: "Invalid body",
        description: error.issues.map((i) => ({
          message: i.message,
          param: i.path.join(""),
        })),
      },
    };
  }
};
