import { FC } from "react";
import { WidgetProps } from "../components/CourseDetail";
import { ChildComponentProps, CourseImagesWidget, Image } from "@/typing/models";
import React from "react";
import Carousel from 'react-elastic-carousel'


const CourseImages: FC<ChildComponentProps<Image>> = ({child}) => {
  return (
    <div className="slider-card"><img src={child.image} /></div>
  )

}
  

const CourseImagesWidget: FC<WidgetProps<CourseImagesWidget>> = ({widget}) => {

  const breakPoint = [
    {width: 200, itemsToShow: 1},
    {width: 400, itemsToShow: 2},
    {width: 580, itemsToShow: 3},
    {width: 900, itemsToShow: 4},
  ]

    return (
      <div className="slider">
        <Carousel breakPoints={breakPoint}>
          {widget.children.map((c) => <CourseImages child={c} key={c.id}/>)}
        </Carousel>
        </div>
    );
  };
  
  export default CourseImagesWidget;