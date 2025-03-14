import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@packages/vds';

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
          <DialogTitle>새로 병합 이미지</DialogTitle>
        </DialogHeader>
        <DialogDescription>미리보기</DialogDescription>
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
