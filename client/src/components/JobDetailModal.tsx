import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Bookmark } from "lucide-react";
import type { JobPosting } from "@/types";

interface JobDetailModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
  onViewPDF: (pdfUrl: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function JobDetailModal({ job, isOpen, onClose, onViewPDF }: JobDetailModalProps) {
  const handleViewPDF = () => {
    if (job.pdfUrl) {
      onViewPDF(job.pdfUrl);
    }
  };

  const handleApply = () => {
    window.open(job.originalUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
            {job.title}
          </DialogTitle>
          <DialogDescription>
            {job.ministry} {job.department} 채용공고 상세정보
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[70vh] space-y-6">
          {/* Job Info Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">모집개요</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><strong>부처:</strong> {job.ministry}</div>
                  <div><strong>직종:</strong> {job.jobType}</div>
                  <div><strong>고용형태:</strong> {job.employmentType}</div>
                  <div><strong>모집인원:</strong> {job.positions}명</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">일정 및 위치</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>
                    <strong>접수기간:</strong> {formatDate(job.applicationPeriodStart)} ~ {formatDate(job.applicationPeriodEnd)}
                  </div>
                  <div><strong>근무지:</strong> {job.location}</div>
                  <div><strong>담당부서:</strong> {job.department}</div>
                  <div><strong>문의전화:</strong> {job.contact}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">채용 상세내용</h4>
            <div className="prose prose-sm text-gray-600 space-y-4">
              <div>
                <strong>◆ 주요업무</strong>
                <p className="mt-1 whitespace-pre-line">{job.description}</p>
              </div>
              
              <div>
                <strong>◆ 지원자격</strong>
                <p className="mt-1 whitespace-pre-line">{job.requirements}</p>
              </div>
              
              {job.preferredQualifications && (
                <div>
                  <strong>◆ 우대사항</strong>
                  <p className="mt-1 whitespace-pre-line">{job.preferredQualifications}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {job.pdfUrl && (
              <Button 
                onClick={handleViewPDF}
                className="flex-1 min-w-[200px] bg-gov-blue hover:bg-gov-dark text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                원본 공고보기 (PDF)
              </Button>
            )}
            
            <Button 
              onClick={handleApply}
              variant="outline"
              className="flex-1 min-w-[200px] border-gray-300 hover:bg-gray-50"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              지원하기
            </Button>
            
            <Button variant="ghost" className="px-6">
              <Bookmark className="mr-1 h-4 w-4" />
              북마크
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
