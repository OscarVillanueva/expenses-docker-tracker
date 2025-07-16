// deno-lint-ignore-file no-explicit-any
import { Status } from "@oak/oak";

export interface Response<T> {
  success: boolean;
  data: {
    message: string;
    data?: T;
    status: Status;
    [key: string]: any;
  };
}
