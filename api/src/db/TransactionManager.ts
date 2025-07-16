import { Status } from "jsr:@oak/commons@1/status";
import { Response } from "../types/Response.ts";
import { TransactionResponse } from "../types/TransactionManagerTypes.ts";
import { PurposeManager } from "./PurposeManager.ts";
import {
  GetTransaction,
  CreateTransaction,
  Transaction,
  DeleteTransaction,
} from "../types/TransactionManagerTypes.ts";

export const TransactionManager = {
  table: "transaction",
  select: "*, purpose!inner(belong_to)",
  foreignKey: "purpose.belong_to",
  async get(props: GetTransaction): Promise<Response<TransactionResponse[]>> {
    const { userID, client } = props;

    const { data, error } = await client
      .from(this.table)
      .select(this.select)
      .eq(this.foreignKey, userID)
      .gte("date", "2024-11-01")
      .lte("date", "2025-01-23")
      .order("date", { ascending: false });

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "unexpected_failure",
          status: Status.UnprocessableEntity,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "purpose data",
        data: data as unknown as TransactionResponse[],
        status: Status.OK,
      },
    };
  },
  async insert(props: CreateTransaction): Promise<Response<Transaction[]>> {
    const { client, userID, transaction } = props;

    const exists = await client
      .from(PurposeManager.table)
      .select()
      .eq("belong_to", userID)
      .eq(PurposeManager.primaryKey, transaction.included_in);

    if (exists.error || exists.data.length === 0)
      return {
        success: false,
        data: {
          message: "the insertion was unsuccessful",
          status: Status.UnprocessableEntity,
        },
      };

    const { data, error } = await client
      .from(this.table)
      .insert(transaction)
      .select(this.select);

    if (error) {
      return {
        success: false,
        data: {
          message: error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "purpose created successfully",
        data: data as unknown as Transaction[],
        status: Status.OK,
      },
    };
  },
  async delete(props: DeleteTransaction): Promise<Response<GetTransaction[]>> {
    const { client, userID, transactionID } = props;

    const exists = await client
      .from(this.table)
      .select(this.select)
      .eq("id", transactionID)
      .eq(this.foreignKey, userID);

    if (exists.error || exists.data.length === 0)
      return {
        success: false,
        data: {
          message: "the deletion was unsuccessful",
          status: Status.UnprocessableEntity,
        },
      };

    const { data, error } = await client
      .from(this.table)
      .delete()
      .eq("id", transactionID)
      .select();

    if (error)
      return {
        success: false,
        data: {
          message: error.code,
          status: Status.UnprocessableEntity,
        },
      };

    return {
      success: true,
      data: {
        message: "transaction deleted, rows affected",
        data,
        status: Status.OK,
      },
    };
  },
};
