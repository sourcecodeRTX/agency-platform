'use client';

import { EDITORS } from '@/lib/editors-config';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditorSelected: (editorId: string) => void;
}

export function EditorSelectionModal({
  isOpen,
  onClose,
  onEditorSelected,
}: EditorSelectionModalProps) {
  const [selectedEditorId, setSelectedEditorId] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedEditorId(null);
    }
  }, [isOpen]);

  const handleContinue = () => {
    if (selectedEditorId) {
      onEditorSelected(selectedEditorId);
      setSelectedEditorId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2
              id="editor-modal-title"
              className="text-xl font-semibold text-text-primary font-mono"
            >
              Select Your Code Editor
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Choose your preferred code editor to see customized usage instructions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-raised transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content - Editor Selection Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EDITORS.map((editor) => (
              <button
                key={editor.id}
                onClick={() => setSelectedEditorId(editor.id)}
                className={`relative flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                  selectedEditorId === editor.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-surface-raised hover:border-border/80 hover:bg-border/20'
                }`}
                aria-pressed={selectedEditorId === editor.id}
                role="radio"
              >
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                    selectedEditorId === editor.id
                      ? 'border-accent bg-accent'
                      : 'border-border'
                  }`}
                />

                {/* Editor info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={editor.name}>
                      {editor.icon}
                    </span>
                    <h3 className="font-semibold text-text-primary">{editor.name}</h3>
                  </div>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {editor.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedEditorId}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
