export interface JobPosting {
  id: string;
  title: string;
  ministry: string;
  department: string;
  jobType: string;
  employmentType: string;
  location: string;
  positions: number;
  description: string;
  requirements: string;
  preferredQualifications?: string;
  applicationPeriodStart: string;
  applicationPeriodEnd: string;
  contact: string;
  originalUrl: string;
  pdfUrl?: string;
  isUrgent: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Statistics {
  totalJobs: number;
  urgentJobs: number;
  newJobs: number;
  ministries: number;
}

export interface SearchFilters {
  query?: string;
  ministry?: string;
  jobType?: string;
  employmentType?: string;
  sortBy?: "latest" | "deadline" | "ministry";
  page?: number;
  limit?: number;
}
