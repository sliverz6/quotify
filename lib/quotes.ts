import { supabase } from "./supabase";

export interface Quote {
  id: number;
  text: string;
  author: string;
  role: string;
}

export async function fetchQuoteById(id: number): Promise<Quote | null> {
  const { data, error } = await supabase
    .from("quotes")
    .select("id, text, author, role")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
}

export async function fetchQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from("quotes")
    .select("id, text, author, role")
    .order("id");

  if (error) throw new Error(`Failed to fetch quotes: ${error.message}`);
  if (!data || data.length === 0) throw new Error("No quotes found in database");
  return data;
}

function dayIndex(y: number, m: number, d: number, n: number): number {
  const seed = y * 10000 + m * 100 + d;
  let h = (seed ^ 0x9e3779b1) >>> 0;
  h = Math.imul(h, 2654435761) >>> 0;
  return h % n;
}

export function weekOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return Math.ceil((days + start.getDay() + 1) / 7);
}

export function getTodaysQuote(quotes: Quote[]): { quote: Quote; index: number } {
  const now = new Date();
  const i = dayIndex(now.getFullYear(), now.getMonth() + 1, now.getDate(), quotes.length);
  return { quote: quotes[i], index: i };
}
