import { FC, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  CourseProgramModule as ICourseProgramModule,
  CourseProgramWidget as ICourseProgramWidget,
} from "@/types/models";
import { WidgetProps } from "../WidgetContainer";
import ChildrenWrapper, {
  ChildComponentProps,
} from "./components/ChildrenWrapper";
import Child from "./components/Child";

const CourseProgramModule: FC<ChildComponentProps<ICourseProgramModule>> = ({
  child: program,
  updateChild: updateProgram,
  ...props
}) => {
  const [title, setTitle] = useState(program.title);
  const [content, setContent] = useState(program.content);

  useEffect(() => {
    setTitle(program.title);
    setContent(program.content);
  }, [program]);

  const cancelChanges = () => {
    setTitle(program.title);
    setContent(program.content);
  };

  const submitChanges = () => {
    updateProgram({ ...program, title, content });
  };

  return (
    <div className="child-wrapper course-program-module-wrapper">
      <Child
        {...props}
        cancel={cancelChanges}
        submit={submitChanges}
        editingModeNode={
          <>
            <input
              type="text"
              className="base-input"
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CKEditor
              editor={ClassicEditor}
              data={program.content}
              onChange={(event: any, editor: any) => {
                setContent(editor.getData());
              }}
            />
          </>
        }
        readingModeNode={
          <>
            <h3>
              {} {program.title}
            </h3>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: program.content }}
            ></div>
          </>
        }
      />
    </div>
  );
};

const CourseProgramWidget: FC<WidgetProps<ICourseProgramWidget>> = ({
  ...props
}) => {
  const programInitValue = {
    title: "",
    content: "",
  };

  return (
    <div className="widget widget-with-children course-programs-widget">
      <ChildrenWrapper
        {...props}
        ChildComponent={CourseProgramModule}
        childInitValue={programInitValue}
      />
    </div>
  );
};

export const CourseProgramWidgetIcon: FC = () => (
  <div className="widget-icon-container">
    <div className="widget-icon course-program-widget-icon">
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
    <h4>Модули Программы Обучения</h4>
  </div>
);

export default CourseProgramWidget;
