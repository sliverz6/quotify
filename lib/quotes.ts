export interface Quote {
  id: number;
  text: string;
  author: string;
  role: string;
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "배우고 때때로 익히면 또한 기쁘지 아니한가.",
    author: "공자 (孔子)",
    role: "중국 사상가 · BCE 551–479",
  },
  {
    id: 2,
    text: "당신을 죽이지 못하는 것은 당신을 더 강하게 만든다.",
    author: "프리드리히 니체",
    role: "독일 철학자 · 1844–1900",
  },
  {
    id: 3,
    text: "상상력은 지식보다 중요하다.",
    author: "알베르트 아인슈타인",
    role: "이론물리학자 · 1879–1955",
  },
  {
    id: 4,
    text: "나는 생각한다, 그러므로 나는 존재한다.",
    author: "르네 데카르트",
    role: "프랑스 철학자 · 1596–1650",
  },
  {
    id: 5,
    text: "검토되지 않은 삶은 살 가치가 없다.",
    author: "소크라테스",
    role: "고대 그리스 철학자 · BCE 470–399",
  },
  {
    id: 6,
    text: "천 리 길도 한 걸음부터 시작된다.",
    author: "노자 (老子)",
    role: "도가 사상가 · BCE 6세기",
  },
  {
    id: 7,
    text: "행복은 습관이다. 몸에 지니라.",
    author: "엘버트 허버드",
    role: "미국 작가 · 1856–1915",
  },
  {
    id: 8,
    text: "우리가 두려워해야 할 유일한 것은 두려움 그 자체다.",
    author: "프랭클린 D. 루스벨트",
    role: "미국 32대 대통령 · 1882–1945",
  },
  {
    id: 9,
    text: "인간은 자유롭도록 선고받은 존재다.",
    author: "장 폴 사르트르",
    role: "실존주의 철학자 · 1905–1980",
  },
  {
    id: 10,
    text: "삶이 있는 한 희망은 있다.",
    author: "마르쿠스 툴리우스 키케로",
    role: "로마 정치가 · BCE 106–43",
  },
];

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

export function getTodaysQuote(): { quote: Quote; index: number } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const i = dayIndex(y, m, d, quotes.length);
  return { quote: quotes[i], index: i };
}
