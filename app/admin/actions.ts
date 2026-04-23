"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function deleteQuote(formData: FormData) {
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_SECRET) return;

  const id = Number(formData.get("id"));
  if (!id) return;

  await supabaseAdmin.from("quotes").delete().eq("id", id);
  revalidatePath("/admin");
}
