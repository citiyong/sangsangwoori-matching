"use server";

import { supabase } from "@/lib/supabase";
import { runMatching } from "@/lib/matching";
import { revalidatePath } from "next/cache";

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
  const career_years = parseInt(formData.get("career_years") as string, 10);

  if (!name || !region || !desired_job || isNaN(career_years) || career_years < 0) {
    return { error: "모든 항목을 올바르게 입력해 주세요." };
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

export async function assignSeniorAction(seniorId: string): Promise<void> {
  await supabase
    .from("seniors")
    .update({ status: "assigned" })
    .eq("id", seniorId);
  revalidatePath("/admin");
}
