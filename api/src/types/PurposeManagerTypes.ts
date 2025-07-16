// Get: Purpose
export type GetPurpose = {
  userID: string;
} 

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
} 

// Delete: Purpose
export type DeletePurpose = {
  purposeID: number;
  userID: string;
} 

// Update: Purpose
export type UpdatePurpose = {
  name: string;
  purposeID: number;
  userID: string;
} 
