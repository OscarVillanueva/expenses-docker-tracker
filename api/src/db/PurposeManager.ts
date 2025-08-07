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
import { purpose } from "./schema.ts";
import { eq, and, desc } from 'drizzle-orm';

export const PurposeManager = {
  async get(props: GetPurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { userID } = props;

      const data = await db
        .select()
        .from(purpose)
        .where(eq(purpose.belong_to, userID));

      return {
        success: true,
        data: {
          message: "purpose data",
          data: data as GetPurposeResponse[],
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
  async insert(props: CreatePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { name, userID } = props;

      await db
        .insert(purpose)
        .values({ name, belong_to: userID });

      // Get the most recent purpose for this user
      const data = await db
        .select()
        .from(purpose)
        .where(eq(purpose.belong_to, userID))
        .orderBy(desc(purpose.id))
        .limit(1);

      return {
        success: true,
        data: {
          message: "purpose created successfully",
          data: data as GetPurposeResponse[],
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
  async delete(props: DeletePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { purposeID, userID } = props;

      await db
        .delete(purpose)
        .where(
          and(
            eq(purpose.id, purposeID),
            eq(purpose.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "purpose deleted successfully",
          data: [],
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
  async update(props: UpdatePurpose): Promise<Response<GetPurposeResponse[]>> {
    try {
      const { name, purposeID, userID } = props;

      await db
        .update(purpose)
        .set({ name })
        .where(
          and(
            eq(purpose.id, purposeID),
            eq(purpose.belong_to, userID)
          )
        );

      // Get the updated purpose
      const data = await db
        .select()
        .from(purpose)
        .where(
          and(
            eq(purpose.id, purposeID),
            eq(purpose.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "purpose updated successfully",
          data: data as GetPurposeResponse[],
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
