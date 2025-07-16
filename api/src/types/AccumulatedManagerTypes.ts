import { SupabaseClient } from "jsr:@supabase/supabase-js@2";
type AccumulatedBase = {
  client: SupabaseClient;
};

// Get: Accumulated
export type GetAccumulated = {
  userID: string;
} & AccumulatedBase;

export interface GetAccumulatedResponse {
  id: number;
  total: number;
  belong_to: string;
  created_at: Date;
  name: string;
}

// Create: Accumulated
export type CreateAccumulated = {
  name: string;
  total: number;
  userID: string;
} & AccumulatedBase;

// Delete: Accumulated
export type DeleteAccumulated = {
  accumulatedID: number;
  userID: string;
} & AccumulatedBase;

// Update: Accumulated
export type UpdateAccumulated = {
  name: string;
  total: number;
  accumulatedID: number;
  userID: string;
} & AccumulatedBase;
