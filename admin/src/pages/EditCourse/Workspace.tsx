import { Widget } from "@/types/models";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { WidgetContainer } from "./WidgetContainer/WidgetContainer";

interface WorkspaceProps {
  widgets: Widget[];
}

export const WORKSPACE_DROPPABLE_ID = "WORKSPACE";

const Workspace: FC<WorkspaceProps> = ({ widgets }) => {
  return (
    <div className="workspace">
      <Droppable droppableId={WORKSPACE_DROPPABLE_ID}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {widgets?.map((w, index) => (
              <WidgetContainer widget={w} key={w.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {widgets?.length === 0 && (
        <div className="empty-workspace">Перенесите сюда виджет</div>
      )}
    </div>
  );
};

export default Workspace;
