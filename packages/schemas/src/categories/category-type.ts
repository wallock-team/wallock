export const CategoryTypeValues = ['income', 'expense'] as const;
export type CategoryType = typeof CategoryTypeValues[number];
