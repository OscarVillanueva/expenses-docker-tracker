export type Purpose = {
  id: number;
  uuid: string;
  name: string;
  total: string;
  belong_to: string;
  created_at: string;
};

export type PurposeData = {
  message: string;
  data: Purpose[];
  status: number;
};
