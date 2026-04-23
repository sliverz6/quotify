"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type SubmitState = { ok: true } | { ok: false; error: string } | null;

export async function submitQuote(prev: SubmitState, formData: FormData): Promise<SubmitState> {
  if (formData.get("website")) return { ok: false, error: "봇 감지됨" };

  const text = (formData.get("text") as string)?.trim() ?? "";
  const author = (formData.get("author") as string)?.trim() ?? "";
  const role = (formData.get("role") as string)?.trim() ?? "";

  if (text.length < 1) return { ok: false, error: "명언을 입력해주세요." };
  if (text.length > 500) return { ok: false, error: "명언은 500자 이하로 입력해주세요." };
  if (author.length > 100) return { ok: false, error: "저자 이름은 100자 이하로 입력해주세요." };

  const { error } = await supabase.from("quotes").insert({
    text,
    author: author || "익명",
    role,
  });
  if (error) return { ok: false, error: "저장에 실패했습니다. 다시 시도해주세요." };

  redirect("/discover?published=1");
}
