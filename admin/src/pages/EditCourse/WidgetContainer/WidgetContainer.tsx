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
import Actions, {
  DeleteAction,
  HideRevealAction,
} from "@/pages/EditCourse/WidgetContainer/components/Actions";
import CourseImagesWidget from "./widgets/CourseImagesWidget";
import CourseProgramWidget from "./widgets/CourseProgramWidget";
import FeaturesWidget from "./widgets/FeaturesWidget";
import CourseSchedulerWidget from "./widgets/CourseSchedulerWidget";

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
        <DeleteAction action={() => dispatch(deleteWidget(widget.id))} />
      </Actions>
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
