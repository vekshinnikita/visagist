import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextWidget as ITextWidget } from "@/types/models";
import { WidgetProps } from "../WidgetContainer";

const TextWidget: FC<WidgetProps<ITextWidget>> = ({
  widget,
  isEditing,
  updateWidget,
}) => {
  return (
    <div className="widget text-widget">
      {isEditing ? (
        <CKEditor
          editor={ClassicEditor}
          data={widget.content}
          onChange={(event: any, editor: any) => {
            updateWidget({
              ...widget,
              content: editor.getData(),
            });
          }}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: widget.content }}></div>
      )}
    </div>
  );
};

export const TextWidgetIcon = () => (
  <div className="widget-icon-container">
    <div className="widget-icon text-widget-icon">Text</div>
    <h4>Текст</h4>
  </div>
);

export default TextWidget;
