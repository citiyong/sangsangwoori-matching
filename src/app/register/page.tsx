"use client";

import { useActionState } from "react";
import { registerSeniorAction } from "@/app/actions";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerSeniorAction, null);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">시니어 프로필 등록</h1>
      <p className="text-xl text-gray-600 mb-10">
        아래 정보를 입력하시면 맞춤 일자리를 추천해 드립니다.
      </p>

      {state?.error && (
        <div className="mb-6 p-5 bg-red-50 border-2 border-red-400 rounded-xl text-xl text-red-700 font-semibold">
          ❗ {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mb-6 p-5 bg-green-50 border-2 border-green-500 rounded-xl text-xl text-green-700 font-semibold">
          ✅ 등록 완료!{" "}
          {state.matchCount && state.matchCount > 0
            ? `${state.matchCount}개의 일자리가 매칭되었습니다. 추천 목록을 확인해 보세요.`
            : "현재 매칭 가능한 일자리가 없습니다. 나중에 다시 확인해 주세요."}
        </div>
      )}

      <form action={action} className="bg-white rounded-2xl shadow-md p-8 space-y-7">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xl font-semibold text-gray-800">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            required
            className="w-full text-xl border-2 border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="region" className="block text-xl font-semibold text-gray-800">
            지역
          </label>
          <input
            id="region"
            name="region"
            type="text"
            placeholder="예: 서울 강남구"
            required
            className="w-full text-xl border-2 border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="desired_job" className="block text-xl font-semibold text-gray-800">
            희망 직종
          </label>
          <input
            id="desired_job"
            name="desired_job"
            type="text"
            placeholder="예: 경비원, 요양보호사"
            required
            className="w-full text-xl border-2 border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="career_years" className="block text-xl font-semibold text-gray-800">
            경력 (년)
          </label>
          <input
            id="career_years"
            name="career_years"
            type="number"
            min={0}
            placeholder="예: 5"
            required
            className="w-full text-xl border-2 border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-xl font-bold py-5 px-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white rounded-xl transition-colors shadow-sm"
        >
          {isPending ? "등록 중..." : "등록하기"}
        </button>
      </form>
    </div>
  );
}
