import { Bell, Menu, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Landmark className="text-2xl text-gov-blue" />
              <h1 className="text-xl font-bold text-gov-dark">정부 채용정보</h1>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              <a href="#" className="text-gray-600 hover:text-gov-blue transition-colors font-medium">
                전체 채용정보
              </a>
              <a href="#" className="text-gray-600 hover:text-gov-blue transition-colors font-medium">
                부처별 보기
              </a>
              <a href="#" className="text-gray-600 hover:text-gov-blue transition-colors font-medium">
                마감임박
              </a>
              <a href="#" className="text-gray-600 hover:text-gov-blue transition-colors font-medium">
                공지사항
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
