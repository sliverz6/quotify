"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

export default function PublishedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("published") === "1") {
      setShow(true);
      router.replace("/discover", { scroll: false });
    }
  }, [searchParams, router]);

  if (!show) return null;
  return (
    <Toast
      message="명언이 발행됐습니다!"
      type="ok"
      onClose={() => setShow(false)}
    />
  );
}
