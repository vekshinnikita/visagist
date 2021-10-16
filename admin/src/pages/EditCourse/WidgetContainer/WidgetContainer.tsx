import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteWidget,
  hideWidget,
  revealWidget,
  updateWidget,
} from "@/state/widgets";
import { WidgetTypes } from "@/types/enumerates";
import Actions, {
  DeleteAction,
  HideRevealAction,
} from "../widgets/components/Actions";
import TextWidget from "../widgets/TextWidget";
import ImageWidget from "../widgets/ImageWidget";
import CourseImagesWidget from "../widgets/CourseImagesWidget";
import CourseProgramWidget from "../widgets/CourseProgramWidget";
import FeaturesWidget from "../widgets/FeaturesWidget";
import CourseSchedulerWidget from "../widgets/CourseSchedulerWidget";
import { Draggable } from "react-beautiful-dnd";

interface WidgetContainerProps {
  widget: any;
  index: number;
}

export const WidgetContainer: FC<WidgetContainerProps> = ({
  widget,
  index,
}) => {
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
    <Draggable draggableId={`${widget.id}`} index={index}>
      {(provided) => (
        <div
          className={
            "widget-container" + (widget.is_visible ? "" : " widget-invisible")
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Actions
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            submit={submitChanges}
            cancel={cancelChanges}
          >
            <HideRevealAction
              isVisible={widget.is_visible}
              hide={() => dispatch(hideWidget(widget.id))}
              reveal={() => dispatch(revealWidget(widget.id))}
            />
            <DeleteAction action={() => dispatch(deleteWidget(widget))} />
          </Actions>
          <Widget
            widget={widgetPreSaveState}
            isEditing={isEditing}
            updateWidget={(widget) => setWidgetPreSaveState(widget)}
          />
        </div>
      )}
    </Draggable>
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
    case WidgetTypes.FEATURES_WIDGET:
      return <FeaturesWidget {...props} />;
    case WidgetTypes.COURSE_IMAGES_WIDGET:
      return <CourseImagesWidget {...props} />;
    case WidgetTypes.COURSE_PROGRAM_WIDGET:
      return <CourseProgramWidget {...props} />;
    case WidgetTypes.COURSE_SCHEDULE_WIDGET:
      return <CourseSchedulerWidget {...props} />;
    default:
      return <></>;
  }
};
