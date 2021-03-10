export interface IWeek {
  id: string;
  name: string;
}

export interface IWorkTimeForm {
  mon_start?: string;
  mon_end?: string;
  tue_start?: string;
  tue_end?: string;
  wed_start?: string;
  wed_end?: string;
  thu_start?: string;
  thu_end?: string;
  fri_start?: string;
  fri_end?: string;
  sat_start?: string;
  sat_end?: string;
  sun_start?: string;
  sun_end?: string;
}

export interface IWorkTime {
  mon?: IWorkDay;
  tue?: IWorkDay;
  wed?: IWorkDay;
  thu?: IWorkDay;
  fri?: IWorkDay;
  sat?: IWorkDay;
  sun?: IWorkDay;
}

export interface IWorkDay {
  start: string;
  end: string;
}
