import { Widget } from "@/types/models";
import * as constants from "./widget.constants";

type DeleteWidgetValue = {
  type: typeof constants.DELETE_WIDGET;
  widgetId: number;
};

type CreateWidgetValue = {
  type: typeof constants.CREATE_WIDGET;
  widget: Widget;
};

type UpdateWidgetValue = {
  type: typeof constants.UPDATE_WIDGET;
  widget: Widget;
};

type MoveWidgetValue = {
  type: typeof constants.MOVE_WIDGET;
  widgetId: number;
  position: number;
};

type HideWidgetValue = {
  type: typeof constants.HIDE_WIDGET;
  widgetId: number;
};

type RevealWidgetValue = {
  type: typeof constants.REVEAL_WIDGET;
  widgetId: number;
};

export type DeleteWidget = (widgetId: number) => DeleteWidgetValue;
export type CreateWidget = (widget: Widget) => CreateWidgetValue;
export type UpdateWidget = (widget: Widget) => UpdateWidgetValue;
export type MoveWidget = (
  widgetId: number,
  position: number
) => MoveWidgetValue;
export type HideWidget = (widgetId: number) => HideWidgetValue;
export type RevealWidget = (widgetId: number) => RevealWidgetValue;

export type ActionsReturnValues =
  | DeleteWidgetValue
  | CreateWidgetValue
  | MoveWidgetValue
  | HideWidgetValue
  | RevealWidgetValue
  | UpdateWidgetValue;
