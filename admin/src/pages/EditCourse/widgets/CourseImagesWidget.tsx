import { FC, useEffect, useState } from "react";
import {
  CourseImagesWidget as ICourseImagesWidget,
  Image as CourseImage,
} from "@/types/models";
import { WidgetProps } from "../WidgetContainer";
import ImageField from "@/common/components/ImageField";
import ChildrenWrapper, {
  ChildComponentProps,
} from "./components/ChildrenWrapper";
import Child from "./components/Child";

const Image: FC<ChildComponentProps<CourseImage>> = ({
  child: courseImage,
  updateChild: updateCourseImage,
  ...props
}) => {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    setImage(courseImage.image);
  }, [courseImage]);

  const cancelChanges = () => {
    setImage(courseImage.image);
  };

  const submitChanges = () => {
    updateCourseImage({ ...courseImage, image });
  };

  return (
    <div className="child-wrapper course-image-wrapper">
      <Child
        {...props}
        cancel={cancelChanges}
        submit={submitChanges}
        editingModeNode={<ImageField value={image} setValue={setImage} />}
        readingModeNode={<img src={image} alt="" />}
      />
    </div>
  );
};

const CourseImagesWidget: FC<WidgetProps<ICourseImagesWidget>> = ({
  ...props
}) => {
  const imageInitValue = {
    image: "",
  };

  return (
    <div className="widget widget-with-children course-images-widget">
      <ChildrenWrapper
        {...props}
        ChildComponent={Image}
        childInitValue={imageInitValue}
      />
    </div>
  );
};

export const CourseImagesWidgetIcon: FC = () => (
  <div className="widget-icon-container">
    <div className="widget-icon course-images-widget-icon">
      <div>Img</div>
      <div>Img</div>
      <div>Img</div>
    </div>
    <h4>Изображения</h4>
  </div>
);

export default CourseImagesWidget;
