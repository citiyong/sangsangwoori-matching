"use client";

import { useTransition } from "react";
import { assignSeniorAction } from "@/app/actions";

export default function AssignButton({ seniorId }: { seniorId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => assignSeniorAction(seniorId))
      }
      disabled={isPending}
      className="text-lg font-semibold px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-xl transition-colors"
    >
      {isPending ? "처리 중..." : "배정 완료"}
    </button>
  );
}
