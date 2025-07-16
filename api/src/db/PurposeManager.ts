import { Status } from "jsr:@oak/commons@1/status";
import {
  GetPurpose,
  GetPurposeResponse,
  CreatePurpose,
  DeletePurpose,
  UpdatePurpose,
} from "../types/PurposeManagerTypes.ts";
import { Response } from "../types/Response.ts";
import { db } from "./config.ts"
import { eq, and } from 'drizzle-orm';

export const PurposeManager = {
  table: "purpose",
  primaryKey: "id",
  async get(props: GetPurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { userID } = props;

      const data = await db
        .select()
        .from(this.table)
        .where(eq("belong_to", userID));

      return {
        success: true,
        data: {
          message: "purpose data",
          data,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: error.code || "unexpected_failure",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async insert(props: CreatePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { name, userID } = props;

      const data = await db.insert(this.table).values({ name, belong_to: userID })

      return {
        success: true,
        data: {
          message: "purpose created successfully",
          data,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async delete(props: DeletePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { purposeID, userID } = props;

      const data = await db
        .delete(this.table)
        .where(
          and(
            eq(this.primaryKey, purposeID),
            eq("belong_to", userID)
          )
        )

      return {
        success: true,
        data: {
          message: "purpose deleted, rows affected",
          data,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message:
            error.code === "23503" ? "the row is refed somewhere" : error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async update(props: UpdatePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { name, purposeID, userID } = props;

      const data = await db
        .update(this.table)
        .set({  name })
        .where(
          and(
            eq(this.primaryKey, purposeID),
            eq("belong_to", userID)
          )
        );

      return {
        success: true,
        data: {
          message: "purpose updated, rows affected",
          data,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message:
            error.code === "23503" ? "the row is refed somewhere" : error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
};
