import { FC } from "react";
import { WidgetProps } from "../components/CourseDetail";
import { ImageWidget as IImageWidget } from "@/typing/models";
import React from "react";

const ImageWidget: FC<WidgetProps<IImageWidget>> = ({widget}) => (
    <div className="main-photo-course">
        <div className="container">
            <img src={widget.image} />
        </div>
    </div>
);

export default ImageWidget;
  