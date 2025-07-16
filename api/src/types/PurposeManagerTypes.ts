import { SupabaseClient } from "jsr:@supabase/supabase-js@2";
type PurposeBase = {
  client: SupabaseClient;
};

// Get: Purpose
export type GetPurpose = {
  userID: string;
} & PurposeBase;

export interface GetPurposeResponse {
  id: number;
  name: string;
  total: number;
  belong_to: string;
  created_at: Date;
}

// Create: Purpose
export type CreatePurpose = {
  name: string;
  userID: string;
} & PurposeBase;

// Delete: Purpose
export type DeletePurpose = {
  purposeID: number;
  userID: string;
} & PurposeBase;

// Update: Purpose
export type UpdatePurpose = {
  name: string;
  purposeID: number;
  userID: string;
} & PurposeBase;
