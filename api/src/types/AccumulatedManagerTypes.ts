// Get: Accumulated
export type GetAccumulated = {
  userID: string;
};

export interface GetAccumulatedResponse {
  id: number;
  total: string; // Drizzle returns decimal as string
  belong_to: string;
  created_at: Date | null;
  name: string;
}

// Create: Accumulated
export type CreateAccumulated = {
  name: string;
  total: number;
  userID: string;
};

// Delete: Accumulated
export type DeleteAccumulated = {
  accumulatedID: number;
  userID: string;
};

// Update: Accumulated
export type UpdateAccumulated = {
  name: string;
  total: number;
  accumulatedID: number;
  userID: string;
};
