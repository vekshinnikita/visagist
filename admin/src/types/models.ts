import { IconTypes, WidgetTypes } from "./enumerates";

export interface Draggable {
  position: number;
}

export interface Image {
  id: number;
  image: any;
}

export interface CourseLesson {
  id: number;
  date: string;
}

export interface Option extends Draggable {
  id: number;
  icon: IconTypes;
  title: string;
}

export interface CourseFormat extends Draggable {
  id: number;
  title: string;
  text: string;
  price: number;
}

export interface CourseProgram extends Draggable {
  id: number;
  title: string;
  content: string;
}

export interface Widget extends Draggable {
  id: number;
  type: WidgetTypes;
  is_visible: boolean;
}

export interface TextWidget extends Widget {
  content: string;
}

export interface ImageWidget extends Widget {
  image: any;
}

export interface CourseScheduleWidget extends Widget {
  lessons: CourseLesson[];
}

export interface OptionsWidget extends Widget {
  options: Option[];
}

export interface CourseFormatsWidget extends Widget {
  formats: CourseFormat[];
}

export interface CourseImagesWidget extends Widget {
  images: Image[];
}

export interface CourseProgramWidget extends Widget {
  programs: CourseProgram[];
}

export interface Course extends Draggable {
  id: number;
  is_visible: boolean;
  position: number;
  title: string;
  image: string;
}

export interface CourseDetails extends Course {
  widgets: Widget[];
}
