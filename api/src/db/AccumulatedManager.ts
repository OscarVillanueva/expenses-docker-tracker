import { Status } from "jsr:@oak/commons@1/status";

import { Response } from "../types/Response.ts";
import {
  UpdateAccumulated,
  CreateAccumulated,
  DeleteAccumulated,
  GetAccumulated,
  GetAccumulatedResponse,
} from "../types/AccumulatedManagerTypes.ts";

export const AccumulatedManager = {
  table: "accumulated",
  async get(
    props: GetAccumulated
  ): Promise<Response<GetAccumulatedResponse[]>> {
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
        message: "accumulated data",
        data,
        status: Status.OK,
      },
    };
  },
  async insert(
    props: CreateAccumulated
  ): Promise<Response<GetAccumulatedResponse[]>> {
    const { name, total, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .insert({
        name,
        belong_to: userID,
        total,
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
        message: "accumulated created successfully",
        data,
        status: Status.OK,
      },
    };
  },
  async delete(
    props: DeleteAccumulated
  ): Promise<Response<GetAccumulatedResponse[]>> {
    const { accumulatedID, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .delete()
      .eq("id", accumulatedID)
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
        message: "accumulated deleted, rows affected",
        data,
        status: Status.OK,
      },
    };
  },
  async update(
    props: UpdateAccumulated
  ): Promise<Response<GetAccumulatedResponse[]>> {
    const { name, accumulatedID, total, client, userID } = props;

    const { data, error } = await client
      .from(this.table)
      .update({ name, total })
      .eq("id", accumulatedID)
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
        message: "Accumulated updated, rows affected",
        data,
        status: Status.OK,
      },
    };
  },
};
