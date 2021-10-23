import { FC } from "react";
import { TextWidget as ITextWidget } from "@/typing/models";
import { WidgetProps } from "../components/CourseDetail";
import React from "react";

const TextWidget: FC<WidgetProps<ITextWidget>> = ({widget}) => {
  return (
    <><div className="course-body">
      <div className="container">
        <div className="course-description">
          <div dangerouslySetInnerHTML={{ __html: widget.content }}></div>
        </div>
      </div>
    </div>
      </>
  );
};

export default TextWidget;
