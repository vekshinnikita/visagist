import { FC } from "react";
import {
  getIdForNewChild,
  getPositionForNewChild,
  sortDraggableByPosition,
} from "@/utils";
import { WidgetWithChildren } from "@/types/models";
import { WidgetProps } from "../../WidgetContainer/WidgetContainer";
import CreateChild from "./CreateChild";

export interface ChildComponentProps<T> {
  child: T;
  isWidgetEditing: boolean;
  removeChild: () => void;
  updateChild: (child: T) => void;
}

interface ChildrenWrapperProps extends WidgetProps<WidgetWithChildren<any>> {
  childInitValue: {};
  ChildComponent: FC<ChildComponentProps<any>>;
}

const ChildrenWrapper: FC<ChildrenWrapperProps> = ({
  widget,
  childInitValue,
  ChildComponent,
  isEditing,
  updateWidget,
}) => {
  const removeImage = (child: any) => {
    updateWidget({
      ...widget,
      children: widget.children.filter((c) => c.id !== child.id),
    });
  };

  const updateImage = (child: any) => {
    updateWidget({
      ...widget,
      children: sortDraggableByPosition([
        ...widget.children.filter((c) => c.id !== child.id),
        child,
      ]),
    });
  };

  const createImage = () => {
    updateWidget({
      ...widget,
      children: sortDraggableByPosition([
        ...widget.children,
        {
          id: getIdForNewChild(widget.children),
          position: getPositionForNewChild(widget.children),
          ...childInitValue,
        },
      ]),
    });
  };

  return (
    <>
      {widget.children.map((c) => (
        <ChildComponent
          child={c}
          isWidgetEditing={isEditing}
          removeChild={() => removeImage(c)}
          updateChild={(child) => updateImage(child)}
          key={c.id}
        />
      ))}
      {isEditing && <CreateChild create={createImage} />}
    </>
  );
};

export default ChildrenWrapper;
