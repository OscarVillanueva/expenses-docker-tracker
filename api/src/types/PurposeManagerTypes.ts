// Get: Purpose
export type GetPurpose = {
  userID: string;
} 

export interface GetPurposeResponse {
  uuid: string;
  name: string;
  total: string; // Drizzle returns decimal as string
  belong_to: string;
  created_at: Date | null;
}

// Create: Purpose
export type CreatePurpose = {
  name: string;
  userID: string;
} 

// Delete: Purpose
export type DeletePurpose = {
  purposeID: string;
  userID: string;
} 

// Update: Purpose
export type UpdatePurpose = {
  name: string;
  purposeID: string;
  userID: string;
} 
