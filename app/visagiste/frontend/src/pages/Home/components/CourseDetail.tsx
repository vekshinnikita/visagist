import React, { FC, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  featchCourseDetail } from '@/state/courses/courses.actions'
import { selectCourseDetail } from '@/selectors'
import { Link, useParams } from "react-router-dom";
import { WidgetTypes } from "@/typing/entities";
import TextWidget from "../widgets/TextWidget";
import ImageWidget from "../widgets/ImageWidget";
import FeaturesWidget from "../widgets/FeaturesWidget";
import CourseImagesWidget from "../widgets/CourseImagesWidget";
import CourseProgramWidget from "../widgets/CourseProgramWidget";
import CourseSchedulerWidget from "../widgets/CourseSchedulerWidget";


export interface WidgetProps<T> {
  widget: T;
}

export const Widget: FC<WidgetProps<any>> = ({ ...props }) => {
  switch (props.widget.type) {
    case WidgetTypes.TEXT_WIDGET:
      return <TextWidget {...props} />;
    case WidgetTypes.IMAGE_WIDGET:
      return <ImageWidget {...props} />;
    case WidgetTypes.FEATURES_WIDGET:
      return <FeaturesWidget {...props} />;
    case WidgetTypes.COURSE_IMAGES_WIDGET:
      return <CourseImagesWidget {...props} />;
    case WidgetTypes.COURSE_PROGRAM_WIDGET:
      return <CourseProgramWidget {...props} />;
    case WidgetTypes.COURSE_SCHEDULE_WIDGET:
      return <CourseSchedulerWidget {...props} />;
    default:
      return <></>;
  }
};


const CourseDetail: FC = () => {
    const dispatch = useDispatch()
    const { pk } = useParams<{ pk: string }>();
   
    useEffect(() => {
        dispatch(featchCourseDetail(Number(pk)))
    }, [pk])
    const course = useSelector(selectCourseDetail);
 
    return (
        <main>
            <div className="content">
            <div className="course">
                <div className="container">
                    <div className="course-cover">
                        <div className="row-course">
                            <div className="photo-course">
                            </div>
                            <div className="course-title">
                                <div className="cover-space"></div>
                                <h1>{course.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    {course.widgets?.map((w) => (
                    <Widget widget={w} key={w.id} />
                    ))}
                </div>
            </div>
            <div className="signup">
                <div className="container">
                    <div className="signup-form">
                        <div className="singup-title after">
                            <h2>Запись на курс</h2>
                        </div>
                        <div className="signup-row a">
                            <a href="#">
                                <div className="signup-btn btn-telegram">
                                    <span>Telegram</span>
                                </div>
                            </a>
                            <a href="#">
                                <div className="signup-btn btn-whatsapp">
                                    <span>Whatsapp</span>
                                </div>
                            </a>
                            <a href="#">
                                <div className="signup-btn btn-instagram">
                                    <span>Instagram</span>
                                </div>
                            </a>
                        </div>
                        
                        
                    </div>  
                </div>
            </div>
        </div>
    </main>
    )
};
  
export default CourseDetail;
