import { WidgetTypes } from "@/types/enumerates";

export const getWidgetInitValue: any = (type: string) => {
  switch (type) {
    case WidgetTypes.TEXT_WIDGET:
      return {
        content: "",
        type: WidgetTypes.TEXT_WIDGET,
      };
    case WidgetTypes.IMAGE_WIDGET:
      return {
        image: "",
        type: WidgetTypes.IMAGE_WIDGET,
      };
    case WidgetTypes.FEATURES_WIDGET:
      return {
        type: WidgetTypes.FEATURES_WIDGET,
        children: [],
      };
    case WidgetTypes.COURSE_IMAGES_WIDGET:
      return {
        type: WidgetTypes.COURSE_IMAGES_WIDGET,
        children: [],
      };
    case WidgetTypes.COURSE_PROGRAM_WIDGET:
      return {
        title: "",
        content: "",
        children: [],
        type: WidgetTypes.COURSE_PROGRAM_WIDGET,
      };
    case WidgetTypes.COURSE_SCHEDULE_WIDGET:
      return {
        type: WidgetTypes.COURSE_SCHEDULE_WIDGET,
        children: [],
      };
    default:
      return {};
  }
};
