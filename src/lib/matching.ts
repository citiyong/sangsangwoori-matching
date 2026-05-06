import { supabase } from "./supabase";
import type { Senior, Job } from "@/types";

function calcScore(senior: Senior, job: Job): number {
  let score = 0;

  // 지역 일치: +50
  if (senior.region.trim() === job.region.trim()) score += 50;

  // 직종 일치 (부분 문자열, 대소문자 무시): +40
  const desired = senior.desired_job.toLowerCase().trim();
  const jobType = job.job_type.toLowerCase().trim();
  const jobTitle = job.title.toLowerCase().trim();
  if (
    desired === jobType ||
    desired === jobTitle ||
    desired.includes(jobType) ||
    jobType.includes(desired) ||
    desired.includes(jobTitle) ||
    jobTitle.includes(desired)
  ) {
    score += 40;
  }

  // 경력 요건 충족: +10
  if (senior.career_years >= job.required_career) score += 10;

  return score;
}

export async function runMatching(senior: Senior): Promise<number> {
  const { data: jobs, error } = await supabase.from("jobs").select("*");
  if (error || !jobs || jobs.length === 0) return 0;

  const toInsert = (jobs as Job[])
    .map((job) => ({
      senior_id: senior.id,
      job_id: job.id,
      score: calcScore(senior, job),
    }))
    .filter((m) => m.score > 0);

  if (toInsert.length === 0) return 0;

  await supabase.from("matches").insert(toInsert);
  await supabase
    .from("seniors")
    .update({ status: "pending" })
    .eq("id", senior.id);

  return toInsert.length;
}
