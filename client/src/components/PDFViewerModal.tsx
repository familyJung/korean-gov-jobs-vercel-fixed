import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface PDFViewerModalProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewerModal({ pdfUrl, isOpen, onClose }: PDFViewerModalProps) {
  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-full max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              채용공고 원본
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="mr-1 h-4 w-4" />
              다운로드
            </Button>
          </div>
          <DialogDescription>
            정부 채용공고 PDF 문서를 확인하세요
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 bg-gray-100 p-4 min-h-0">
          <div className="w-full h-full bg-white rounded shadow-sm">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0 rounded"
              title="PDF 뷰어"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
