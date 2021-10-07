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
        <div className="widget-edit image-widget-edit">
          <CKEditor
            editor={ClassicEditor}
            data={widget.content}
            onChange={(event: any, editor: any) => {
              const updatedWidget = {
                ...widget,
                content: editor.getData(),
              };
              updateWidget(updatedWidget);
            }}
          />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: widget.content }}></div>
      )}
    </div>
  );
};

export default TextWidget;
