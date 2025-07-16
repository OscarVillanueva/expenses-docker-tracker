import { Status } from "jsr:@oak/commons@1/status";
import {
  GetPurpose,
  GetPurposeResponse,
  CreatePurpose,
  DeletePurpose,
  UpdatePurpose,
} from "../types/PurposeManagerTypes.ts";
import { Response } from "../types/Response.ts";

export const PurposeManager = {
  table: "purpose",
  primaryKey: "id",
  async get(props: GetPurpose): Promise<Response<GetPurposeResponse[]>> {
    const { userID, client } = props;

    const { data, error } = await client
      .from(this.table)
      .select()
      .eq("belong_to", userID);

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
        data,
        status: Status.OK,
      },
    };
  },
  async insert(props: CreatePurpose): Promise<Response<GetPurposeResponse[]>> {
    const { name, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .insert({
        name,
        belong_to: userID,
      })
      .select();

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
        data,
        status: Status.OK,
      },
    };
  },
  async delete(props: DeletePurpose): Promise<Response<GetPurposeResponse[]>> {
    const { purposeID, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .delete()
      .eq(this.primaryKey, purposeID)
      .eq("belong_to", userID)
      .select();

    if (error) {
      return {
        success: false,
        data: {
          message:
            error.code === "23503" ? "the row is refed somewhere" : error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "purpose deleted, rows affected",
        data,
        status: Status.OK,
      },
    };
  },
  async update(props: UpdatePurpose): Promise<Response<GetPurposeResponse[]>> {
    const { name, purposeID, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .update({ name })
      .eq(this.primaryKey, purposeID)
      .eq("belong_to", userID)
      .select();

    if (error) {
      return {
        success: false,
        data: {
          message:
            error.code === "23503" ? "the row is refed somewhere" : error.code,
          status: Status.UnprocessableEntity,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "purpose updated, rows affected",
        data,
        status: Status.OK,
      },
    };
  },
};
