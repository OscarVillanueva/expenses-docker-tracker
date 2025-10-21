import { Status } from "jsr:@oak/commons@1/status";
import * as uuid from "jsr:@std/uuid";
import { eq, and, gte, desc } from 'drizzle-orm';
import {
  GetPurpose,
  GetPurposeResponse,
  CreatePurpose,
  DeletePurpose,
  UpdatePurpose,
  FetchPurposeTransactions,
} from "../types/PurposeManagerTypes.ts";
import { Response } from "../types/Response.ts";
import { TransactionResponse } from "../types/TransactionManagerTypes.ts";
import { db } from "./config.ts"
import { purpose, transaction } from "./schema.ts";

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
  async transactions(props: FetchPurposeTransactions): Promise<Response<TransactionResponse[]>>{
    try {
      const { userID, purposeID } = props;

      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const result = await db
        .select({
          ...transaction,
          included_in: purpose.uuid,
          purposeName: purpose.name
        })
        .from(transaction)
        .innerJoin(purpose, eq(transaction.included_in, purpose.id))
        .where(
          and(
            eq(purpose.uuid, purposeID),
            eq(purpose.belong_to, userID),
            gte(transaction.date, twoMonthsAgo)
          )
        )
        .orderBy(desc(transaction.date));
      
      return {
        success: true,
        data: {
          message: "transaction data",
          data: result as TransactionResponse[],
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "unexpected_failure",
          status: Status.UnprocessableEntity
        }
      } 
    }
  },
  async insert(props: CreatePurpose): Promise<Response<string>> {
    try {
      const { name, userID } = props;

      const idx = uuid.v1.generate()

      await db
        .insert(purpose)
        .values({ uuid: idx, name, belong_to: userID });

      return {
        success: true,
        data: {
          message: "purpose created successfully",
          data: idx,
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
  async delete(props: DeletePurpose): Promise<Response<boolean>> {
    try {
      const { purposeID, userID } = props;

      await db
        .delete(purpose)
        .where(
          and(
            eq(purpose.uuid, purposeID),
            eq(purpose.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "purpose deleted successfully",
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
  async update(props: UpdatePurpose): Promise<Response<string>> {
    try {
      const { name, purposeID, userID } = props;

      await db
        .update(purpose)
        .set({ name })
        .where(
          and(
            eq(purpose.uuid, purposeID),
            eq(purpose.belong_to, userID)
          )
        );

      return {
        success: true,
        data: {
          message: "purpose updated successfully",
          data: purposeID,
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
