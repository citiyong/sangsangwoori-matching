"use client";

import { useActionState, useState } from "react";
import { registerSeniorAction } from "@/app/actions";

const REGIONS = ["서울", "경기", "인천", "기타"] as const;
const JOB_TYPES = ["경비", "청소", "조리", "돌봄", "기타"] as const;

type FieldErrors = {
  name?: string;
  region?: string;
  desired_job?: string;
};

// 공통 셀렉트 스타일
const selectCls = (hasError: boolean) =>
  `w-full text-xl border-2 rounded-xl px-5 py-4 bg-white focus:outline-none transition-colors appearance-none cursor-pointer ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-300 focus:border-blue-600"
  }`;

const inputCls = (hasError: boolean) =>
  `w-full text-xl border-2 rounded-xl px-5 py-4 focus:outline-none transition-colors ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-300 focus:border-blue-600"
  }`;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-2 border-red-400 rounded-lg text-lg font-semibold text-red-700">
      ❗ {msg}
    </div>
  );
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerSeniorAction,
    null
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const errors: FieldErrors = {};

    if (!fd.get("name")?.toString().trim()) errors.name = "이름을 입력해 주세요.";
    if (!fd.get("region")?.toString()) errors.region = "지역을 선택해 주세요.";
    if (!fd.get("desired_job")?.toString())
      errors.desired_job = "희망 직종을 선택해 주세요.";

    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        시니어 프로필 등록
      </h1>
      <p className="text-xl text-gray-600 mb-10">
        아래 정보를 입력하시면 맞춤 일자리를 추천해 드립니다.
      </p>

      {/* 서버 에러 */}
      {state?.error && (
        <div className="mb-6 p-5 bg-red-50 border-2 border-red-400 rounded-xl text-xl text-red-700 font-semibold">
          ❗ {state.error}
        </div>
      )}

      {/* 성공 */}
      {state?.success && (
        <div className="mb-6 p-5 bg-green-50 border-2 border-green-500 rounded-xl text-xl text-green-700 font-semibold">
          ✅ 등록이 완료되었습니다!{" "}
          {state.matchCount && state.matchCount > 0
            ? `${state.matchCount}개의 일자리가 매칭되었습니다.`
            : "현재 매칭 가능한 일자리가 없습니다."}
        </div>
      )}

      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 space-y-7"
      >
        {/* 이름 */}
        <div className="space-y-2">
          <FieldError msg={fieldErrors.name} />
          <label htmlFor="name" className="block text-xl font-semibold text-gray-800">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            className={inputCls(!!fieldErrors.name)}
          />
        </div>

        {/* 지역 */}
        <div className="space-y-2">
          <FieldError msg={fieldErrors.region} />
          <label htmlFor="region" className="block text-xl font-semibold text-gray-800">
            지역 <span className="text-red-500">*</span>
          </label>
          <select
            id="region"
            name="region"
            defaultValue=""
            className={selectCls(!!fieldErrors.region)}
          >
            <option value="" disabled>
              지역을 선택하세요
            </option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* 희망 직종 */}
        <div className="space-y-2">
          <FieldError msg={fieldErrors.desired_job} />
          <label htmlFor="desired_job" className="block text-xl font-semibold text-gray-800">
            희망 직종 <span className="text-red-500">*</span>
          </label>
          <select
            id="desired_job"
            name="desired_job"
            defaultValue=""
            className={selectCls(!!fieldErrors.desired_job)}
          >
            <option value="" disabled>
              직종을 선택하세요
            </option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* 경력 */}
        <div className="space-y-2">
          <label htmlFor="career_years" className="block text-xl font-semibold text-gray-800">
            경력 (년)
          </label>
          <input
            id="career_years"
            name="career_years"
            type="number"
            min={0}
            defaultValue={0}
            className={inputCls(false)}
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
