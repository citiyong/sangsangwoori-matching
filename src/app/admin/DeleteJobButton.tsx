"use client";

import { useTransition } from "react";
import { deleteJobAction } from "@/app/actions";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm("이 일자리를 삭제하시겠습니까?")) return;
        startTransition(() => deleteJobAction(jobId));
      }}
      disabled={isPending}
      className="text-base font-semibold px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-xl transition-colors"
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
