export class ContributeEntity {
  /**
   * 시작일
   * @format YYYY-MM-DD
   */
  startDate: string;
  /**
   * 종료일
   * @format YYYY-MM-DD
   */
  endDate: string;
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
  /**
   * 컨트리뷰트 데이터
   */
  data: DateData[];

  /**
   * 사용자 ID
   */
  userId: string;
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
