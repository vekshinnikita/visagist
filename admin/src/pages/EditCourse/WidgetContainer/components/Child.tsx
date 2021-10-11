import { FC, ReactChild, useState } from "react";
import Actions, { DeleteAction } from "./Actions";

interface ChildProps {
  isWidgetEditing: boolean;
  cancel: () => void;
  submit: () => void;
  removeChild: () => void;
  editingModeNode: ReactChild;
  readingModeNode: ReactChild;
}

const Child: FC<ChildProps> = ({
  isWidgetEditing,
  cancel,
  submit,
  removeChild,
  editingModeNode,
  readingModeNode,
}) => {
  const [isChildEditing, setIsChildEditing] = useState(false);
  const cancelChanges = () => {
    cancel();
    setIsChildEditing(false);
  };

  const submitChanges = () => {
    submit();
    setIsChildEditing(false);
  };

  return (
    <>
      {isWidgetEditing && (
        <Actions
          isEditing={isChildEditing}
          setIsEditing={setIsChildEditing}
          cancel={cancelChanges}
          submit={submitChanges}
        >
          <DeleteAction action={removeChild} />
        </Actions>
      )}
      <div className="child">
        {isWidgetEditing && isChildEditing ? editingModeNode : readingModeNode}
      </div>
    </>
  );
};

export default Child;
