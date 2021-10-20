import { FC, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  CourseLesson,
  CourseScheduleWidget as ICourseSchedulerWidget,
} from "@/types/models";
import { checkDateTimeFormat, stringifyDate } from "@/utils";
import { WidgetProps } from "../WidgetContainer/WidgetContainer";
import ChildrenWrapper, {
  ChildComponentProps,
} from "./components/ChildrenWrapper";
import Child from "./components/Child";

const Lesson: FC<ChildComponentProps<CourseLesson>> = ({
  child: lesson,
  updateChild: updateCourseImage,
  ...props
}) => {
  const [date, setDate] = useState<Date>(new Date(lesson.date));

  useEffect(() => {
    setDate(new Date(lesson.date));
  }, [lesson]);

  const cancelChanges = () => {
    setDate(new Date(lesson.date));
  };

  const submitChanges = () => {
    updateCourseImage({ ...lesson, date: stringifyDate(date) });
  };

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

  const displayDate = () => {
    const day = checkDateTimeFormat(date.getDate());
    const month = getMonth(date.getMonth());
    const year = checkDateTimeFormat(date.getFullYear());
    return `${day} ${month} ${year}`;
  };

  const displayTime = () =>
    `${checkDateTimeFormat(date.getHours())}:${checkDateTimeFormat(
      date.getMinutes()
    )}`;

  return (
    <div className="child-wrapper lesson-wrapper">
      <Child
        {...props}
        cancel={cancelChanges}
        submit={submitChanges}
        editingModeNode={<DateTimePicker value={date} onChange={setDate} />}
        readingModeNode={
          <>
            <h3>{displayDate()}</h3>
            <h3>{displayTime()}</h3>
          </>
        }
      />
    </div>
  );
};

const CourseSchedulerWidget: FC<WidgetProps<ICourseSchedulerWidget>> = ({
  ...props
}) => {
  const lessonInitValue = {
    date: stringifyDate(new Date()),
  };

  return (
    <div className="widget widget-with-children scheduler-widget">
      <ChildrenWrapper
        {...props}
        ChildComponent={Lesson}
        childInitValue={lessonInitValue}
      />
    </div>
  );
};

export const CourseScheduleWidgetIcon = () => (
  <div className="widget-icon-container">
    <div className="widget-icon course-schedule-widget-icon">
      <div>
        <div>01</div>
        <div></div>
      </div>
      <div>
        <div>18</div>
        <div></div>
      </div>
      <div>
        <div>21</div>
        <div></div>
      </div>
    </div>
    <h4>Расписание</h4>
  </div>
);

export default CourseSchedulerWidget;
