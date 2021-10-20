import { WidgetTypes } from "./entities";

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

export interface CourseDetails extends Course {
  widgets: Widget[];
}

export interface Widget extends Draggable {
  id: number;
  type: WidgetTypes;
  is_visible: boolean;
}