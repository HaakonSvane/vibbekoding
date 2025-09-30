import React from "react";

interface ModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  show,
  onClose,
  children,
  footer,
}) => {
  if (!show) return null;
  return (
    <div className="modal fade show d-block" role="dialog" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </div>
  );
};
