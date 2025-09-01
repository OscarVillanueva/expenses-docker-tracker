export type Accumulated = {
  id: number;
  uuid: string;
  name: string;
  total: string; 
  belong_to: string;
  created_at: string;
};

export type AccumulatedResponse = {
  message: string;
  data: Accumulated[];
  status: number;
};
