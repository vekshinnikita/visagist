import { WidgetTypes } from "@/types/enumerates";
import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CourseImagesWidgetIcon } from "./widgets/CourseImagesWidget";
import { CourseProgramWidgetIcon } from "./widgets/CourseProgramWidget";
import { CourseScheduleWidgetIcon } from "./widgets/CourseSchedulerWidget";
import { FeaturesWidgetIcon } from "./widgets/FeaturesWidget";
import { ImageWidgetIcon } from "./widgets/ImageWidget";
import { TextWidgetIcon } from "./widgets/TextWidget";

export const WIDGETS_NAV_DROPPABLE_ID = "WIDGETS_NAV";

const WidgetsNav: FC = () => {
  return (
    <aside className="widgets-nav">
      <h3>Виджеты</h3>
      <div className="icons">
        <Droppable droppableId={WIDGETS_NAV_DROPPABLE_ID}>
          {(providedDrop) => (
            <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
              <Draggable draggableId={WidgetTypes.TEXT_WIDGET} index={1}>
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <TextWidgetIcon />
                  </div>
                )}
              </Draggable>
              <Draggable draggableId={WidgetTypes.IMAGE_WIDGET} index={2}>
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <ImageWidgetIcon />
                  </div>
                )}
              </Draggable>
              <Draggable
                draggableId={WidgetTypes.COURSE_SCHEDULE_WIDGET}
                index={3}
              >
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <CourseScheduleWidgetIcon />
                  </div>
                )}
              </Draggable>
              <Draggable draggableId={WidgetTypes.FEATURES_WIDGET} index={4}>
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <FeaturesWidgetIcon />
                  </div>
                )}
              </Draggable>
              <Draggable
                draggableId={WidgetTypes.COURSE_IMAGES_WIDGET}
                index={5}
              >
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <CourseImagesWidgetIcon />
                  </div>
                )}
              </Draggable>
              <Draggable
                draggableId={WidgetTypes.COURSE_PROGRAM_WIDGET}
                index={6}
              >
                {(providedDrag) => (
                  <div
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    ref={providedDrag.innerRef}
                  >
                    <CourseProgramWidgetIcon />
                  </div>
                )}
              </Draggable>
              {providedDrop.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </aside>
  );
};

export default WidgetsNav;
