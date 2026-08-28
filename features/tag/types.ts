export type Tag = {
  readonly id: string;
  name: string;
  items: number;
};

export type TagFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
