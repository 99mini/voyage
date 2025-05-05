export class ContributeEntity {
  /**
   * 오늘 이어지는 streak
   */
  currentStreak: number;
  /**
   * 최대 streak
   */
  maxStreak: number;
  data: DateData[];
}

export class DateData {
  /**
   * @format YYYY-MM-DD
   */
  date: string;
  total: number;
}
