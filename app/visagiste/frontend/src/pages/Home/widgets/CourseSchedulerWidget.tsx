import { ChildComponentProps, CourseLesson, CourseScheduleWidget } from "@/typing/models";
import React from "react";
import { FC } from "react";
import { WidgetProps } from "../components/CourseDetail";


const checkDateTimeFormat = (hms: number) =>
  String(hms).length === 1 ? "0" + hms : hms;


const CourseScheduler: FC<ChildComponentProps<CourseLesson>> = ({child}) => {
  
  const getMonth = (monthNumber: number) =>
      [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ][monthNumber];
  
    const displayDate = (date: Date) => {
      const day = checkDateTimeFormat(date.getDate());
      const month = getMonth(date.getMonth());
      const year = checkDateTimeFormat(date.getFullYear());
      return `${day} ${month} ${year}`;
    };
  
    const displayTime = (date: Date) =>
      `${checkDateTimeFormat(date.getHours())}:${checkDateTimeFormat(
        date.getMinutes()
      )}`;


  return (
    <div className="course-date">
      <h3>{displayDate(new Date(child.date))}</h3>
      <h3>{displayTime(new Date(child.date))}</h3>
    </div>
    
  )
}

const CourseSchedulerWidget: FC<WidgetProps<CourseScheduleWidget>> = ({widget}) => {

  
    
  
    return (
      <div className="course-dates">
        <div className="container">
            <div className="course-dates-title after">
                <h2>ДАТА ПРОВЕДЕНИЯ</h2>
            </div>  
            {widget.children.map((c) => <CourseScheduler child={c} key={c.id}/>)}
        </div>
    </div>

    );
  };
  
  export default CourseSchedulerWidget;
  