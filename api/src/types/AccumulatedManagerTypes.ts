// Get: Accumulated
export type GetAccumulated = {
  userID: string;
};

export interface GetAccumulatedResponse {
  id: number;
  uuid: string;
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
  accumulatedID: string;
  userID: string;
};
