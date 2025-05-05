export namespace WakaTime {
  export interface Day {
    categories: Category[];
    /**
     * @format YYYY-MM-DD
     */
    date: string;
    total: number;
  }

  export interface Category {
    name: 'Coding' | 'Debugging';
    total: number;
  }

  export interface Contribute {
    data: {
      days: Day[];
      human_readable_range: string;
      is_already_updating: boolean;
      is_including_today: boolean;
      is_stuck: boolean;
      is_up_to_date: boolean;
      is_up_to_date_pending_future: boolean;
      percent_calculated: number;
      range: string;
      status: string;
      timeout: number;
      user_id: string;
      writes_only: boolean;
    };
  }
}
