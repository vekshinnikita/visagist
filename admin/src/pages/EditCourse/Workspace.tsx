import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectIsCurrentCourseLoading } from "@/selectors";
import { Widget } from "@/types/models";
import { WidgetContainer } from "./WidgetContainer";
import { Loading } from "@/common/components/Loading";

interface WorkspaceProps {
  widgets: Widget[];
}

export const WORKSPACE_DROPPABLE_ID = "WORKSPACE";

const Workspace: FC<WorkspaceProps> = ({ widgets }) => {
  const isLoading = useSelector(selectIsCurrentCourseLoading);

  return (
    <div className="workspace">
      {!isLoading ? (
        <>
          <Droppable droppableId={WORKSPACE_DROPPABLE_ID}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {widgets.map((w, index) => (
                  <WidgetContainer widget={w} key={w.id} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {widgets?.length === 0 && (
            <div className="empty-workspace">Перенесите сюда виджет</div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Workspace;
