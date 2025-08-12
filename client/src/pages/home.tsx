import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import PDFViewerModal from "@/components/PDFViewerModal";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JobPosting, SearchFilters } from "@/types";

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [selectedPDFUrl, setSelectedPDFUrl] = useState<string>("");
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 10,
    sortBy: "latest",
  });

  const { data: jobsData, isLoading, error } = useQuery({
    queryKey: ["/api/jobs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });
      const response = await fetch(`/api/jobs?${params}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  const { data: statistics } = useQuery({
    queryKey: ["/api/statistics"],
    queryFn: async () => {
      const response = await fetch("/api/statistics");
      if (!response.ok) throw new Error("Failed to fetch statistics");
      return response.json();
    },
  });

  const handleJobClick = (job: JobPosting) => {
    setSelectedJob(job);
  };

  const handleViewPDF = (pdfUrl: string) => {
    setSelectedPDFUrl(pdfUrl);
    setShowPDFViewer(true);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const totalPages = jobsData ? Math.ceil(jobsData.total / (filters.limit || 10)) : 0;
  const currentPage = filters.page || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchFilter filters={filters} onFilterChange={handleFilterChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {statistics && <Statistics statistics={statistics} />}
        
        <div className="space-y-4">

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (jobsData?.jobPostings && jobsData.jobPostings.length > 0) ? (
            jobsData.jobPostings.map((job: JobPosting) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleJobClick(job)}
                onViewPDF={handleViewPDF}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">검색 조건에 맞는 채용공고가 없습니다.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {jobsData?.total > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </Button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                if (page > totalPages) return null;
                
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? "bg-gov-blue text-white hover:bg-gov-blue/90" : "hover:bg-gray-100"}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              다음
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="ml-4 text-sm text-gray-600">
              전체 {jobsData?.total}개 중 {Math.min((currentPage - 1) * (filters.limit || 10) + 1, jobsData?.total || 0)}-{Math.min(currentPage * (filters.limit || 10), jobsData?.total || 0)}개 표시
            </div>
          </div>
        )}
        
        {/* 페이지네이션 정보 */}
        {jobsData?.total > 0 && (
          <div className="flex justify-center mt-4 text-sm text-gray-500">
            페이지 {currentPage} / {totalPages} (총 {jobsData.total}개 채용공고)
          </div>
        )}
      </main>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          onViewPDF={handleViewPDF}
        />
      )}

      {showPDFViewer && (
        <PDFViewerModal
          pdfUrl={selectedPDFUrl}
          isOpen={showPDFViewer}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
    </div>
  );
}
