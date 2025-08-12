import type { Statistics } from "@/types";

interface StatisticsProps {
  statistics: Statistics;
}

export default function Statistics({ statistics }: StatisticsProps) {
  return (
    <div className="bg-gradient-to-r from-gov-blue to-gov-dark text-white rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{statistics.totalJobs}</div>
          <div className="text-sm opacity-90">전체 채용공고</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-warning">{statistics.urgentJobs}</div>
          <div className="text-sm opacity-90">마감 임박</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{statistics.newJobs}</div>
          <div className="text-sm opacity-90">신규 공고</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{statistics.ministries}</div>
          <div className="text-sm opacity-90">참여 부처</div>
        </div>
      </div>
    </div>
  );
}
