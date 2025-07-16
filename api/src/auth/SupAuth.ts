import { User } from "jsr:@supabase/supabase-js@2";
import { Status } from "@oak/oak";
import {
  RefreshToken,
  Sign,
  SendCode,
  VerifyOTP,
  UpdatePassword,
  AuthInfo,
  GetSession,
  AuthBase,
} from "../types/SupAuthTypes.ts";
import { Response } from "../types/Response.ts";

export const SupAuth = {
  signup: async ({
    email,
    password,
    client,
  }: Sign): Promise<Response<AuthInfo>> => {
    const { data, error } = await client.auth.signUp({ email, password });

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "unexpected_failure",
          status:
            error.code === "user_already_exists"
              ? Status.Conflict
              : Status.UnprocessableEntity,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "Account Created successfully",
        status: Status.Created,
        data: {
          user: data.user!,
          session: data.session!,
        },
      },
    };
  },
  signin: async ({
    email,
    password,
    client,
  }: Sign): Promise<Response<AuthInfo>> => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        data: {
          message: "Incorrect email or password",
          status: Status.Unauthorized,
        },
      };
    }

    return {
      success: true,
      data: {
        status: Status.OK,
        message: "Logged in successfully",
        data,
      },
    };
  },
  refreshToken: async ({
    token,
    client,
  }: RefreshToken): Promise<Response<AuthInfo>> => {
    const { data, error } = await client.auth.refreshSession({
      refresh_token: token,
    });

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "invalid_refresh_token",
          status: Status.Unauthorized,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "Refresh token",
        status: Status.Accepted,
        data: {
          user: data.user!,
          session: data.session!,
        },
      },
    };
  },
  sendCodeToEmail: async ({
    email,
    client,
  }: SendCode): Promise<Response<undefined>> => {
    const { error } = await client.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "invalid_email",
          status: Status.BadRequest,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "Send code to the email",
        status: Status.OK,
      },
    };
  },
  verifyOTP: async ({
    email,
    code,
    client,
  }: VerifyOTP): Promise<Response<AuthInfo>> => {
    const { data, error } = await client.auth.verifyOtp({
      email,
      token: code,
      type: "recovery",
    });

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "invalid_code",
          status: Status.NotFound,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "Valid token",
        data: {
          user: data.user!,
          session: data.session!,
        },
        status: Status.OK,
      },
    };
  },
  updateUserPassword: async ({
    password,
    uid,
    client,
  }: UpdatePassword): Promise<Response<User>> => {
    const { data, error } = await client.auth.admin.updateUserById(uid, {
      password,
    });

    if (error) {
      return {
        success: false,
        data: {
          message: error.code || "unexpected_failure",
          status: Status.NotFound,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "Updated password successfully",
        data: data.user,
        status: Status.Accepted,
      },
    };
  },
  getUser: async ({ jwt, client }: GetSession): Promise<Response<User>> => {
    const { data, error } = await client.auth.getUser(jwt);

    if (error) {
      console.log("get");
      console.log(error);
      return {
        success: false,
        data: {
          message: error.code || "bad_jwt",
          status: Status.NotFound,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "session found successfully",
        data: data.user!,
        status: Status.OK,
      },
    };
  },
  signOut: async ({ client }: AuthBase) => {
    const { error } = await client.auth.signOut();

    if (error) {
      console.log("get");
      console.log(error);
      return {
        success: false,
        data: {
          message: error.code || "bad_jwt",
          status: Status.NotFound,
        },
      };
    }

    return {
      success: true,
      data: {
        message: "session closed successfully",
        status: Status.OK,
      },
    };
  },
};
