export interface Senior {
  id: string;
  name: string;
  region: string;
  desired_job: string;
  career_years: number;
  status: "unmatched" | "pending" | "assigned";
  created_at?: string;
}

export interface Job {
  id: string;
  title: string;
  region: string;
  job_type: string;
  required_career: number;
  created_at?: string;
}

export interface Match {
  id: string;
  senior_id: string;
  job_id: string;
  score: number;
  created_at?: string;
}
