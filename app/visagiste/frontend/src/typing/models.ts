import { IconTypes, WidgetTypes } from "./entities";

export interface Draggable {
  position: number;
}


export interface Course extends Draggable {
  id: number;
  is_visible: boolean;
  position: number;
  title: string;
  image: string;
}
export interface Image extends Draggable {
  id: number;
  image: any;
}

export interface CourseLesson {
  id: number;
  date: string;
}

export interface Feature extends Draggable {
  id: number;
  icon: IconTypes;
  title: string;
}

export interface CourseProgramModule extends Draggable {
  id: number;
  title: string;
  content: string;
}

export interface WidgetWithChildren<T> extends Widget {
  children: T[];
}
export interface ChildComponentProps<T> {
  child: T;
}

export interface CourseDetails extends Course {
  widgets: Widget[];
}

export interface Widget extends Draggable {
  id: number;
  type: WidgetTypes;
  is_visible: boolean;
}
export interface Widget extends Draggable {
  id: number;
  type: WidgetTypes;
  is_visible: boolean;
}
export interface ImageWidget extends Widget {
  image: any;
}
export interface TextWidget extends Widget {
  content: string;
}

export interface ImageWidget extends Widget {
  image: any;
}

export interface CourseScheduleWidget extends WidgetWithChildren<CourseLesson> {}

export interface FeaturesWidget extends WidgetWithChildren<Feature> {}

export interface CourseImagesWidget extends WidgetWithChildren<Image> {}

export interface CourseProgramWidget
  extends WidgetWithChildren<CourseProgramModule> {}
