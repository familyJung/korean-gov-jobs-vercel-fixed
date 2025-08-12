import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SearchFilters } from "@/types";

interface SearchFilterProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
}

const ministries = [
  "전체 부처",
  "행정안전부",
  "기획재정부",
  "고용노동부",
  "교육부",
  "환경부",
  "국토교통부",
  "과학기술정보통신부",
  "외교부",
  "통일부",
  "법무부",
  "국방부",
  "문화체육관광부",
  "농림축산식품부",
  "산업통상자원부",
  "보건복지부",
  "여성가족부",
];

const jobTypes = [
  "전체 직종",
  "행정직",
  "기술직",
  "연구직",
  "교육직",
  "의료직",
  "환경직",
];

const employmentTypes = [
  "전체 고용형태",
  "정규직",
  "계약직",
  "인턴",
];

const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "deadline", label: "마감임박순" },
  { value: "ministry", label: "부처명순" },
];

export default function SearchFilter({ filters, onFilterChange }: SearchFilterProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="채용 제목, 부처명, 직종으로 검색하세요..."
              className="pl-10"
              value={filters.query || ""}
              onChange={(e) => onFilterChange({ query: e.target.value })}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select
              value={filters.ministry || "전체 부처"}
              onValueChange={(value) => onFilterChange({ ministry: value === "전체 부처" ? undefined : value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((ministry) => (
                  <SelectItem key={ministry} value={ministry}>
                    {ministry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.jobType || "전체 직종"}
              onValueChange={(value) => onFilterChange({ jobType: value === "전체 직종" ? undefined : value })}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((jobType) => (
                  <SelectItem key={jobType} value={jobType}>
                    {jobType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.employmentType || "전체 고용형태"}
              onValueChange={(value) => onFilterChange({ employmentType: value === "전체 고용형태" ? undefined : value })}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employmentTypes.map((employmentType) => (
                  <SelectItem key={employmentType} value={employmentType}>
                    {employmentType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.sortBy || "latest"}
              onValueChange={(value) => onFilterChange({ sortBy: value as "latest" | "deadline" | "ministry" })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
