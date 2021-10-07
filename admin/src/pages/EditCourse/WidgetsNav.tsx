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

const OptionsWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon options-widget-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>Опции</h4>
    </div>
  );
};

const CourseFormatsWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon course-formats-widget-icon">
        <div>10$</div>
        <div>20$</div>
        <div>30$</div>
      </div>
      <h4>Форматы обучения</h4>
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
      <h4>Программы</h4>
    </div>
  );
};

const SignUpFormWidgetIcon: FC = () => {
  return (
    <div className="widget-icon-container">
      <div className="widget-icon sign-up-widget-icon">
        <div>Name</div>
        <div>Submit</div>
      </div>
      <h4>Форма</h4>
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
        <OptionsWidgetIcon />
        <CourseFormatsWidgetIcon />
        <CourseImagesWidgetIcon />
        <CourseProgramWidgetIcon />
        <SignUpFormWidgetIcon />
      </div>
    </aside>
  );
};

export default WidgetsNav;
