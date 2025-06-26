export class GetHistoryDto {
  /**
   * 사용자 ID
   */
  userId: string;

  /**
   * 페이지
   */
  page?: number;

  /**
   * 페이지당 로그 수
   */
  limit?: number;
}
