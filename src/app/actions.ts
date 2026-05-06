"use server";

import { supabase } from "@/lib/supabase";
import { runMatching } from "@/lib/matching";
import { revalidatePath } from "next/cache";

// ─── Senior 등록 ──────────────────────────────────────────────────────────────
export type RegisterState = {
  error?: string;
  success?: boolean;
  matchCount?: number;
} | null;

export async function registerSeniorAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = (formData.get("name") as string)?.trim();
  const region = (formData.get("region") as string)?.trim();
  const desired_job = (formData.get("desired_job") as string)?.trim();
  const career_years = parseInt(formData.get("career_years") as string, 10) || 0;

  if (!name || !region || !desired_job) {
    return { error: "필수 항목을 모두 입력해 주세요." };
  }

  const { data: senior, error } = await supabase
    .from("seniors")
    .insert({ name, region, desired_job, career_years })
    .select()
    .single();

  if (error || !senior) {
    return { error: "등록에 실패했습니다. 다시 시도해 주세요." };
  }

  const matchCount = await runMatching(senior);

  revalidatePath("/recommendations");
  revalidatePath("/admin");

  return { success: true, matchCount };
}

// ─── Senior 배정 ──────────────────────────────────────────────────────────────
export async function assignSeniorAction(seniorId: string): Promise<void> {
  await supabase
    .from("seniors")
    .update({ status: "assigned" })
    .eq("id", seniorId);
  revalidatePath("/admin");
}

// ─── Job 추가 ─────────────────────────────────────────────────────────────────
export type AddJobState = {
  error?: string;
  success?: boolean;
} | null;

export async function addJobAction(
  _prev: AddJobState,
  formData: FormData
): Promise<AddJobState> {
  const title = (formData.get("title") as string)?.trim();
  const region = (formData.get("region") as string)?.trim();
  const job_type = (formData.get("job_type") as string)?.trim();
  const required_career = parseInt(formData.get("required_career") as string, 10) || 0;

  if (!title || !region || !job_type) {
    return { error: "공고명, 지역, 직종을 모두 입력해 주세요." };
  }

  const { error } = await supabase
    .from("jobs")
    .insert({ title, region, job_type, required_career });

  if (error) return { error: "등록에 실패했습니다. 다시 시도해 주세요." };

  revalidatePath("/admin");
  return { success: true };
}

// ─── Job 삭제 ─────────────────────────────────────────────────────────────────
export async function deleteJobAction(jobId: string): Promise<void> {
  await supabase.from("jobs").delete().eq("id", jobId);
  revalidatePath("/admin");
}
