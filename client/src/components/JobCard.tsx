import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Users, Clock, Eye, FileText } from "lucide-react";
import type { JobPosting } from "@/types";

interface JobCardProps {
  job: JobPosting;
  onClick: () => void;
  onViewPDF?: (pdfUrl: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getDaysUntilDeadline(deadlineString: string): number {
  const deadline = new Date(deadlineString);
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getStatusBadge(job: JobPosting) {
  const daysLeft = getDaysUntilDeadline(job.applicationPeriodEnd);
  
  if (job.isUrgent || daysLeft <= 3) {
    return <Badge className="bg-urgent text-white">마감임박</Badge>;
  }
  if (job.isNew) {
    return <Badge className="bg-gov-orange text-white">신규</Badge>;
  }
  if (daysLeft <= 7) {
    return <Badge className="bg-warning text-white">마감예정</Badge>;
  }
  return <Badge className="bg-success text-white">모집중</Badge>;
}

function getEmploymentTypeBadge(employmentType: string) {
  const colorMap: Record<string, string> = {
    "정규직": "bg-blue-100 text-blue-700",
    "계약직": "bg-green-100 text-green-700",
    "인턴": "bg-purple-100 text-purple-700",
  };
  
  return (
    <Badge className={colorMap[employmentType] || "bg-gray-100 text-gray-700"}>
      {employmentType}
    </Badge>
  );
}

export default function JobCard({ job, onClick, onViewPDF }: JobCardProps) {
  const daysLeft = getDaysUntilDeadline(job.applicationPeriodEnd);
  
  const handleViewPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.pdfUrl && onViewPDF) {
      onViewPDF(job.pdfUrl);
    }
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(job)}
              <Badge variant="secondary">{job.ministry}</Badge>
              {getEmploymentTypeBadge(job.employmentType)}
            </div>
            
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-gov-blue"
              onClick={handleDetailClick}
            >
              {job.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Bus className="h-4 w-4" />
                {job.jobType}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location.split(" ")[0]} {job.location.split(" ")[1]}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {job.positions}명
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                접수마감: {formatDate(job.applicationPeriodEnd)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                onClick={handleDetailClick}
                className="bg-gov-blue hover:bg-gov-dark text-white"
              >
                <Eye className="h-4 w-4 mr-1" />
                상세보기
              </Button>
              {job.pdfUrl && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleViewPDF}
                  className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  첨부파일
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className={`font-semibold text-sm mb-1 ${
              daysLeft <= 3 ? "text-urgent" : 
              daysLeft <= 7 ? "text-warning" : 
              "text-gov-blue"
            }`}>
              D{daysLeft >= 0 ? `-${daysLeft}` : `+${Math.abs(daysLeft)}`}
            </div>
            <div className="text-xs text-gray-500">
              등록일: {formatDate(job.createdAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
