import { FC } from "react";
import { sortDraggableByPosition } from "@/utils";
import { Draggable, WidgetWithChildren } from "@/types/models";
import { WidgetProps } from "../WidgetContainer";
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
  const getPositionForNewChild = (items: Draggable[]) =>
    Math.max(...items.map((i) => i.position), 0) + 1;

  const getIdForNewChild = (items: { id: number }[]) =>
    Math.max(...items.map((i) => i.id), 0) + 1;

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
