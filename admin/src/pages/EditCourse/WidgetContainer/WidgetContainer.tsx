import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteWidget,
  hideWidget,
  revealWidget,
  updateWidget,
} from "@/state/widgets";
import { WidgetTypes } from "@/types/enumerates";
import ImageWidget from "./widgets/ImageWidget";
import TextWidget from "./widgets/TextWidget";
import OptionsWidget from "./widgets/OptionsWidget";

interface WidgetContainerProps {
  widget: any;
}

export const WidgetContainer: FC<WidgetContainerProps> = ({ widget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgetPreSaveState, setWidgetPreSaveState] = useState(widget);
  const dispatch = useDispatch();

  const cancelChanges = () => {
    setIsEditing((prev) => !prev);
    setWidgetPreSaveState(widget);
  };

  const submitChanges = () => {
    setIsEditing((prev) => !prev);
    dispatch(updateWidget(widgetPreSaveState));
  };

  return (
    <div
      className={
        "widget-container" + (widget.is_visible ? "" : " widget-invisible")
      }
    >
      <div className="actions">
        <button
          className="hide-reveal-widget"
          onClick={
            widget.is_visible
              ? () => dispatch(hideWidget(widget.id))
              : () => dispatch(revealWidget(widget.id))
          }
        >
          {widget.is_visible ? (
            <i className="fas fa-eye"></i>
          ) : (
            <i className="fas fa-eye-slash"></i>
          )}
        </button>
        {isEditing ? (
          <>
            <button className="submit-changes" onClick={submitChanges}>
              <i className="fas fa-check"></i>
            </button>
            <button className="cancel-changes" onClick={cancelChanges}>
              <i className="fas fa-times"></i>
            </button>
          </>
        ) : (
          <button
            className="edit-widget"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <i
              className="fas fa-edit"
              style={{ color: isEditing ? "var(--blue)" : "var(--grey)" }}
            ></i>
          </button>
        )}
        <button
          className="delete-widget"
          onClick={() => dispatch(deleteWidget(widget.id))}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <Widget
        widget={widgetPreSaveState}
        isEditing={isEditing}
        updateWidget={(widget) => setWidgetPreSaveState(widget)}
      />
    </div>
  );
};

export interface WidgetProps<T> {
  widget: T;
  isEditing: boolean;
  updateWidget: (widget: T) => void;
}

export const Widget: FC<WidgetProps<any>> = ({ ...props }) => {
  switch (props.widget.type) {
    case WidgetTypes.TEXT_WIDGET:
      return <TextWidget {...props} />;
    case WidgetTypes.IMAGE_WIDGET:
      return <ImageWidget {...props} />;
    case WidgetTypes.OPTIONS_WIDGET:
      return <OptionsWidget {...props} />;
    default:
      return <></>;
  }
};
