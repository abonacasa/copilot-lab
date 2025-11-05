export interface Complaint {
  id: string;
  date: string;
  medio: string;
  status: string;
  type: string;
  description: string;
  // Add other fields as needed
}

export interface ComplaintFilterCriteria {
  dateRange: { from: string | null; to: string | null };
  medios: string[];
  status: string[];
  type: string[];
  search: string;
}

export interface ComplaintListResponse {
  complaints: Complaint[];
  total: number;
  page: number;
  pageSize: number;
  sortOrder: string;
}
