export const ServiceTypeEnum = {
  Gold: 1,
  TieredLeveling: 2,
  RankedLeveling: 3,
  Item: 4,
  Raids: 5,
} as const;

export type ServiceTypeEnum =
  (typeof ServiceTypeEnum)[keyof typeof ServiceTypeEnum];

export const ServiceTypeEnumLabel: Record<ServiceTypeEnum, string> = {
  [ServiceTypeEnum.Gold]: 'Gold',
  [ServiceTypeEnum.TieredLeveling]: 'Tiered Leveling',
  [ServiceTypeEnum.RankedLeveling]: 'Ranked Leveling',
  [ServiceTypeEnum.Item]: 'Item',
  [ServiceTypeEnum.Raids]: 'Raids',
};
