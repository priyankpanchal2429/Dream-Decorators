import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/button/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'this item',
  isLoading = false,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Confirm Deletion"
    footer={
      <>
        <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm} isLoading={isLoading} leftIcon={<Trash2 className="h-4 w-4" />}>
          Delete Item
        </Button>
      </>
    }
  >
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-danger/10 text-danger shrink-0">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-txtPrimary font-medium">
          Are you sure you want to permanently delete <strong className="font-bold">{itemName}</strong>?
        </p>
        <p className="text-[10px] text-txtSecondary mt-1">This action cannot be undone and will remove all associated records.</p>
      </div>
    </div>
  </Modal>
);
