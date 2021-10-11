import { FC } from "react";

const TextWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon text-widget-icon">Text</div>
      <h4>Текст</h4>
    </div>
  );
};

const ImageWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon image-widget-icon">Img</div>
      <h4>Изображение</h4>
    </div>
  );
};

const CourseScheduleWidgetIcon: FC = () => {
  return (
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
};

const FeaturesWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon features-widget-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>Особенности</h4>
    </div>
  );
};

const CourseImagesWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon course-images-widget-icon">
        <div>Img</div>
        <div>Img</div>
        <div>Img</div>
      </div>
      <h4>Изображения</h4>
    </div>
  );
};

const CourseProgramWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon course-program-widget-icon">
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <h4>Модули Программы Обучения</h4>
    </div>
  );
};

const WidgetsNav: FC = () => {
  return (
    <aside className="widgets-nav">
      <h3>Виджеты</h3>
      <div className="icons">
        <TextWidgetIcon />
        <ImageWidgetIcon />
        <CourseScheduleWidgetIcon />
        <FeaturesWidgetIcon />
        <CourseImagesWidgetIcon />
        <CourseProgramWidgetIcon />
      </div>
    </aside>
  );
};

export default WidgetsNav;
