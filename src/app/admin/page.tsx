import { supabase } from "@/lib/supabase";
import type { Senior } from "@/types";
import AssignButton from "./AssignButton";

export const dynamic = "force-dynamic";

// ─── 요약 카드 ────────────────────────────────────────────────────────────────
function SummaryCard({
  label,
  count,
  description,
  borderColor,
  badgeBg,
  badgeText,
}: {
  label: string;
  count: number;
  description: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
        <span className={`text-lg font-bold px-3 py-1 rounded-full ${badgeBg} ${badgeText}`}>
          {count}명
        </span>
      </div>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
}

// ─── 시니어 테이블 섹션 ─────────────────────────────────────────────────────
function Section({
  title,
  dotColor,
  seniors,
  showAssign,
}: {
  title: string;
  dotColor: string;
  seniors: Senior[];
  showAssign: boolean;
}) {
  const cols = showAssign ? 5 : 4;

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span className={`inline-block w-3 h-3 rounded-full ${dotColor}`} />
        {title}
      </h3>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-lg font-semibold text-gray-700 px-6 py-4">이름</th>
              <th className="text-left text-lg font-semibold text-gray-700 px-6 py-4">지역</th>
              <th className="text-left text-lg font-semibold text-gray-700 px-6 py-4">희망 직종</th>
              <th className="text-left text-lg font-semibold text-gray-700 px-6 py-4">경력</th>
              {showAssign && (
                <th className="text-left text-lg font-semibold text-gray-700 px-6 py-4">배정</th>
              )}
            </tr>
          </thead>
          <tbody>
            {seniors.length === 0 ? (
              <tr>
                <td colSpan={cols} className="text-lg text-gray-400 text-center py-10">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              seniors.map((s) => (
                <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="text-lg font-medium text-gray-900 px-6 py-4">{s.name}</td>
                  <td className="text-lg text-gray-700 px-6 py-4">{s.region}</td>
                  <td className="text-lg text-gray-700 px-6 py-4">{s.desired_job}</td>
                  <td className="text-lg text-gray-700 px-6 py-4">{s.career_years}년</td>
                  {showAssign && (
                    <td className="px-6 py-4">
                      <AssignButton seniorId={s.id} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── 메인 페이지 ──────────────────────────────────────────────────────────────
export default async function AdminPage() {
  const { data, error } = await supabase
    .from("seniors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-xl text-red-600">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const seniors = (data ?? []) as Senior[];
  const unmatched = seniors.filter((s) => s.status === "unmatched");
  const pending = seniors.filter((s) => s.status === "pending");
  const assigned = seniors.filter((s) => s.status === "assigned");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">담당자 대시보드</h1>
      <p className="text-xl text-gray-600 mb-10">
        시니어별 매칭 현황을 한눈에 확인하세요.
      </p>

      {/* 요약 카드 3종 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          label="미매칭"
          count={unmatched.length}
          description="일자리가 연결되지 않은 시니어"
          borderColor="border-red-400"
          badgeBg="bg-red-100"
          badgeText="text-red-700"
        />
        <SummaryCard
          label="매칭 대기"
          count={pending.length}
          description="추천 목록 검토 중인 시니어"
          borderColor="border-yellow-400"
          badgeBg="bg-yellow-100"
          badgeText="text-yellow-700"
        />
        <SummaryCard
          label="배정 완료"
          count={assigned.length}
          description="일자리 배정이 확정된 시니어"
          borderColor="border-green-500"
          badgeBg="bg-green-100"
          badgeText="text-green-700"
        />
      </div>

      {/* 미매칭 */}
      <Section
        title="미매칭 목록"
        dotColor="bg-red-400"
        seniors={unmatched}
        showAssign={false}
      />

      {/* 매칭 대기 — 배정 완료 버튼 표시 */}
      <Section
        title="매칭 대기 목록"
        dotColor="bg-yellow-400"
        seniors={pending}
        showAssign={true}
      />

      {/* 배정 완료 */}
      <Section
        title="배정 완료 목록"
        dotColor="bg-green-500"
        seniors={assigned}
        showAssign={false}
      />
    </div>
  );
}
