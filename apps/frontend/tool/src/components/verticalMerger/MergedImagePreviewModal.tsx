import { Button } from '@packages/vds';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MergedImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mergedImageUrl: string;
}

function MergedImagePreviewModal({ isOpen, onClose, mergedImageUrl }: MergedImagePreviewModalProps) {
  if (!mergedImageUrl) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-4 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>병합 이미지 미리보기</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img src={mergedImageUrl} alt="Merged Image" className="max-w-full h-auto object-contain rounded" />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MergedImagePreviewModal;
