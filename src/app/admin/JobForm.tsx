"use client";

import { useActionState } from "react";
import { addJobAction } from "@/app/actions";

const REGIONS = ["서울", "경기", "인천", "기타"] as const;
const JOB_TYPES = ["경비", "청소", "조리", "돌봄", "기타"] as const;

const selectCls =
  "w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer";

export default function JobForm() {
  const [state, action, isPending] = useActionState(addJobAction, null);

  return (
    <form action={action} className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-5">일자리 추가</h3>

      {state?.error && (
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-400 rounded-xl text-lg text-red-700 font-semibold">
          ❗ {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-xl text-lg text-green-700 font-semibold">
          ✅ 일자리가 등록되었습니다.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* 공고명 */}
        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-800">
            공고명 <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="예: 아파트 경비원"
            className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* 지역 */}
        <div className="space-y-2">
          <label htmlFor="job_region" className="block text-lg font-semibold text-gray-800">
            지역 <span className="text-red-500">*</span>
          </label>
          <select id="job_region" name="region" defaultValue="" className={selectCls}>
            <option value="" disabled>선택</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* 직종 */}
        <div className="space-y-2">
          <label htmlFor="job_type" className="block text-lg font-semibold text-gray-800">
            직종 <span className="text-red-500">*</span>
          </label>
          <select id="job_type" name="job_type" defaultValue="" className={selectCls}>
            <option value="" disabled>선택</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* 요구 경력 */}
        <div className="space-y-2">
          <label htmlFor="required_career" className="block text-lg font-semibold text-gray-800">
            요구 경력 (년)
          </label>
          <input
            id="required_career"
            name="required_career"
            type="number"
            min={0}
            defaultValue={0}
            className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* 버튼 */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-lg font-bold py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl transition-colors"
          >
            {isPending ? "등록 중..." : "일자리 등록"}
          </button>
        </div>
      </div>
    </form>
  );
}
