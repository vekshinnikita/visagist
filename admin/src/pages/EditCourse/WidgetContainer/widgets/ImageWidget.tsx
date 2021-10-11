import { ChangeEvent, FC, useEffect, useState } from "react";
import { ImageWidget as IImageWidget } from "@/types/models";
import { WidgetProps } from "../WidgetContainer";

const ImageWidget: FC<WidgetProps<IImageWidget>> = ({
  widget,
  isEditing,
  updateWidget,
}) => {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    setImage(widget.image);
  }, [widget]);

  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 0) {
        const image = e.target.files[0];
        const render = new FileReader();

        render.onload = (e) => {
          updateWidget({
            ...widget,
            image: e.target?.result,
          });
        };

        render.readAsDataURL(image);
      }
    }
  };

  return (
    <div className="widget image-widget">
      {isEditing ? (
        <div className="image-field">
          <input type="file" onChange={loadImage} />
          <span
            className="loaded-image"
            style={{
              backgroundImage: `url(${image})`,
              zIndex: image ? 1 : "unset",
            }}
          ></span>
          <span
            className="delete-image"
            style={{ display: image ? "flex" : "none" }}
            onClick={() => setImage("")}
          >
            +
          </span>
          <label>Выберите изображение</label>
        </div>
      ) : (
        <img src={image} alt="" />
      )}
    </div>
  );
};

export default ImageWidget;
