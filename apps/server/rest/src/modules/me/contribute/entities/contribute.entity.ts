export class ContributeEntity {
  /**
   * 오늘 이어지는 streak
   */
  currentStreak: number;
  /**
   * 최대 streak
   */
  maxStreak: number;
  /**
   * 총 컨트리뷰트 량 (시간 | 갯수)
   */
  total: number;
  data: DateData[];
}

export class DateData {
  /**
   * @format YYYY-MM-DD
   */
  date: string;
  /**
   * 총 컨트리뷰트 량 (시간 | 갯수)
   */
  total: number;
}
