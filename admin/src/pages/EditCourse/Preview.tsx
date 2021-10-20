import { FC } from "react";

interface PreviewProps {
  isPreviewOpen: boolean;
  open: () => void;
  close: () => void;
}

const Preview: FC<PreviewProps> = ({
  isPreviewOpen,
  open,
  close,
  children,
}) => {
  if (!isPreviewOpen)
    return (
      <button className="is-preview-open" onClick={open}>
        Предпросмотр
      </button>
    );

  return (
    <div className="preview">
      <div className="container">
        <div className="result">{children}</div>
        <button className="close" onClick={close}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Preview;
