import { Session, SupabaseClient, User } from "jsr:@supabase/supabase-js@2";

export type AuthBase = {
  client: SupabaseClient;
};

export type AuthInfo = {
  user: User;
  session: Session;
};

export type Sign = {
  email: string;
  password: string;
} & AuthBase;

export type RefreshToken = {
  token: string;
} & AuthBase;

export type SendCode = {
  email: string;
} & AuthBase;

export type VerifyOTP = {
  email: string;
  code: string;
} & AuthBase;

export type UpdatePassword = {
  uid: string;
  password: string;
} & AuthBase;

export type GetSession = {
  jwt: string;
} & AuthBase;
