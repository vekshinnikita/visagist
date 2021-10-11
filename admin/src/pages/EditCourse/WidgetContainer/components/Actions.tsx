import { FC } from "react";

interface DeleteActionProps {
  action: () => void;
}

export const DeleteAction: FC<DeleteActionProps> = ({ action }) => {
  return (
    <button className="delete-action" onClick={action}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

interface HideRevealActionProps {
  isVisible: boolean;
  hide: () => void;
  reveal: () => void;
}

export const HideRevealAction: FC<HideRevealActionProps> = ({
  isVisible,
  hide,
  reveal,
}) => {
  return (
    <button
      className="hide-reveal-widget"
      onClick={isVisible ? () => hide() : () => reveal()}
    >
      {isVisible ? (
        <i className="fas fa-eye"></i>
      ) : (
        <i className="fas fa-eye-slash"></i>
      )}
    </button>
  );
};

interface ActionsProps {
  isEditing: boolean;
  setIsEditing: (value: any) => void;
  submit: () => void;
  cancel: () => void;
}

const Actions: FC<ActionsProps> = ({
  isEditing,
  setIsEditing,
  submit,
  cancel,
  children,
}) => {
  return (
    <div className="actions">
      {isEditing ? (
        <>
          <button className="submit-changes" onClick={submit}>
            <i className="fas fa-check"></i>
          </button>
          <button className="cancel-changes" onClick={cancel}>
            <i className="fas fa-times"></i>
          </button>
        </>
      ) : (
        <button
          className="edit-widget"
          onClick={() => setIsEditing((prev: boolean) => !prev)}
        >
          <i
            className="fas fa-edit"
            style={{ color: isEditing ? "var(--blue)" : "var(--grey)" }}
          ></i>
        </button>
      )}
      {children}
    </div>
  );
};

export default Actions;
