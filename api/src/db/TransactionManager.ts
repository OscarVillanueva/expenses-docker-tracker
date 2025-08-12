import { Status } from "jsr:@oak/commons@1/status";
import * as uuid from "jsr:@std/uuid";
import { eq, and, desc } from 'drizzle-orm';
import { db } from "./config.ts"
import { transaction, purpose } from "./schema.ts";
import { Response } from "../types/Response.ts";
import { TransactionResponse } from "../types/TransactionManagerTypes.ts";
import {
  GetTransaction,
  CreateTransaction,
  Transaction,
  DeleteTransaction,
} from "../types/TransactionManagerTypes.ts";

export const TransactionManager = {
  async get(props: GetTransaction): Promise<Response<TransactionResponse[]>> {
    try {
      const { userID } = props;

      const result = await db
        .select()
        .from(transaction)
        .innerJoin(purpose, eq(transaction.included_in, purpose.id))
        .where(eq(purpose.belong_to, userID));

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
          message: "We cannot fetch the data of transactions",
          data: undefined,
          status: Status.NotFound
        }
      }
    }
  },
  async insert(props: CreateTransaction): Promise<Response<Transaction[]>> {
    try {
      const { userID, transaction: transactionData } = props;

      // Check if the purpose exists and belongs to the user
      const existingPurpose = await db
        .select()
        .from(purpose)
        .where(
          and(
            eq(purpose.belong_to, userID),
            eq(purpose.uuid, transactionData.included_in)
          )
        );

      if (existingPurpose.length === 0) {
        return {
          success: false,
          data: {
            message: "the insertion was unsuccessful - purpose not found or doesn't belong to user",
            status: Status.UnprocessableEntity,
          },
        };
      }
      
      const idx = uuid.v1.generate()

      // Insert the transaction
      await db
        .insert(transaction)
        .values({
          date: new Date(transactionData.date),
          uuid: idx,
          is_expense: transactionData.is_expense,
          name: transactionData.name,
          amount: transactionData.amount.toString(),
          included_in: existingPurpose[0].id,
          is_cash: transactionData.is_cash,
        });

      return {
        success: true,
        data: {
          message: "transaction created successfully",
          data: idx,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "unexpected error during insertion",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
  async delete(props: DeleteTransaction): Promise<Response<boolean>> {
    try {
      const { userID, transactionID } = props;

      // Check if transaction exists and belongs to user via purpose
      const existingTransaction = await db
        .select()
        .from(transaction)
        .innerJoin(purpose, eq(transaction.included_in, purpose.id))
        .where(
          and(
            eq(transaction.uuid, transactionID),
            eq(purpose.belong_to, userID)
          )
        );

      if (existingTransaction.length === 0) {
        return {
          success: false,
          data: {
            message: "the deletion was unsuccessful - transaction not found or doesn't belong to user",
            status: Status.UnprocessableEntity,
          },
        };
      }

      // Delete the transaction
      await db
        .delete(transaction)
        .where(eq(transaction.uuid, transactionID));

      return {
        success: true,
        data: {
          message: "transaction deleted successfully",
          data: true,
          status: Status.OK,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          message: (error as Error).message || "unexpected error during deletion",
          status: Status.UnprocessableEntity,
        },
      };
    }
  },
};
