import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface MatchRow {
  id: string;
  score: number;
  seniors: { name: string; desired_job: string; region: string } | null;
  jobs: {
    title: string;
    region: string;
    job_type: string;
    required_career: number;
  } | null;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-green-600"
      : score >= 60
        ? "text-blue-600"
        : "text-gray-500";
  return (
    <div className="text-right shrink-0 ml-6">
      <span className={`text-4xl font-bold ${color}`}>{score}</span>
      <p className="text-base text-gray-500 mt-1">매칭 점수</p>
    </div>
  );
}

export default async function RecommendationsPage() {
  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      "id, score, seniors(name, desired_job, region), jobs(title, region, job_type, required_career)"
    )
    .order("score", { ascending: false });

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xl text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const rows = (matches ?? []) as unknown as MatchRow[];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">매칭 추천 목록</h1>
      <p className="text-xl text-gray-600 mb-10">
        점수 높은 순서로 최적의 일자리를 보여드립니다. (총{" "}
        <strong>{rows.length}</strong>건)
      </p>

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-2xl font-semibold text-gray-500 mb-2">
            아직 매칭된 일자리가 없습니다.
          </p>
          <p className="text-lg text-gray-400">
            프로필을 등록하면 자동으로 매칭이 시작됩니다.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900">
                  {match.jobs?.title ?? "—"}
                </h2>
                <p className="text-lg text-gray-600 mt-1">
                  📍 {match.jobs?.region} · 직종: {match.jobs?.job_type}
                </p>
                <p className="text-lg text-gray-500">
                  요구 경력: {match.jobs?.required_career}년 이상
                </p>
                <p className="text-base text-gray-400 mt-2 border-t border-gray-100 pt-2">
                  신청자: <strong>{match.seniors?.name}</strong> ·{" "}
                  {match.seniors?.region} · {match.seniors?.desired_job}
                </p>
              </div>
              <ScoreBadge score={match.score} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
