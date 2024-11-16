export const getEnumKey = (enumType: any, value: any) => {
    return enumType[value]
}
export const getEnumValue = (enumType: any, value: string) => {
    return enumType[value]
}

export enum HabitPriority {
    Low = 0,
    Medium = 1,
    High = 2,
  }