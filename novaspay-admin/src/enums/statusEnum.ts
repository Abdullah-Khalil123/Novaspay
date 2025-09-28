export const StatusEnum = {
  Pending: 0,
  Completed: 1,
} as const;

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];

export const StatusEnumLabel: Record<StatusEnum, string> = {
  [StatusEnum.Pending]: 'Pending',
  [StatusEnum.Completed]: 'Completed',
};
