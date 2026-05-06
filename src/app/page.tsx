import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">상상우리</h1>
      <p className="text-2xl text-gray-600 mb-12">
        시니어와 일자리를 연결하는 자동 매칭 시스템
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-md transition-colors"
        >
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-2xl font-bold mb-2">프로필 등록</h2>
          <p className="text-lg opacity-90">시니어 정보를 입력하세요</p>
        </Link>

        <Link
          href="/recommendations"
          className="bg-white hover:bg-gray-50 text-gray-900 rounded-2xl p-8 shadow-md border-2 border-gray-200 transition-colors"
        >
          <div className="text-4xl mb-3">⭐</div>
          <h2 className="text-2xl font-bold mb-2">매칭 추천</h2>
          <p className="text-lg text-gray-600">맞춤 일자리를 확인하세요</p>
        </Link>

        <Link
          href="/admin"
          className="bg-white hover:bg-gray-50 text-gray-900 rounded-2xl p-8 shadow-md border-2 border-gray-200 transition-colors"
        >
          <div className="text-4xl mb-3">📊</div>
          <h2 className="text-2xl font-bold mb-2">담당자</h2>
          <p className="text-lg text-gray-600">매칭 현황을 관리하세요</p>
        </Link>
      </div>
    </div>
  );
}
