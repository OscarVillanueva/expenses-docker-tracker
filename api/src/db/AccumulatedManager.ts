import { Status } from "jsr:@oak/commons@1/status";
import * as uuid from "jsr:@std/uuid";
import { eq, and } from 'drizzle-orm';
import { db } from "./config.ts"
import { accumulated } from "./schema.ts";
import { Response } from "../types/Response.ts";
import {
  UpdateAccumulated,
  CreateAccumulated,
  DeleteAccumulated,
  GetAccumulated,
  GetAccumulatedResponse,
} from "../types/AccumulatedManagerTypes.ts";

export const AccumulatedManager = {
  async get(
    props: GetAccumulated
  ): Promise<Response<GetAccumulatedResponse[]>> {
    try {
      const { userID } = props;

      const data = await db
        .select()
        .from(accumulated)
        .where(eq(accumulated.belong_to, userID));

      return {
        success: true,
        data: {
          message: "accumulated data",
          data: data as GetAccumulatedResponse[],
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "unexpected_failure",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async insert(
    props: CreateAccumulated
  ): Promise<Response<string>> {
    try {
      const { name, total, userID } = props;

      const gen = uuid.v1.generate()

      await db
        .insert(accumulated)
        .values({
          uuid: gen,
          name,
          belong_to: userID,
          total: total.toString(),
        });

      return {
        success: true,
        data: {
          message: "accumulated created successfully",
          data: gen,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "insertion failed",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async delete(
    props: DeleteAccumulated
  ): Promise<Response<boolean>> {
    try {
      const { accumulatedID, userID } = props;

      await db
        .delete(accumulated)
        .where(
          and(
            eq(accumulated.uuid, accumulatedID),
            eq(accumulated.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "accumulated deleted successfully",
          data: true,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "deletion failed",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async update(
    props: UpdateAccumulated
  ): Promise<Response<string>> {
    try {
      const { name, accumulatedID, total, userID } = props;

      await db
        .update(accumulated)
        .set({ name, total: total.toString() })
        .where(
          and(
            eq(accumulated.uuid, accumulatedID),
            eq(accumulated.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "accumulated updated successfully",
          data: accumulatedID,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "update failed",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
};
