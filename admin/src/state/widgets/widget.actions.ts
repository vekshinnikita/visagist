import * as types from "./widget.types";
import * as constants from "./widget.constants";

export const deleteWidget: types.DeleteWidget = (widget) => ({
  type: constants.DELETE_WIDGET,
  widget,
});

export const createWidget: types.CreateWidget = (widget) => ({
  type: constants.CREATE_WIDGET,
  widget,
});

export const updateWidget: types.UpdateWidget = (widget) => ({
  type: constants.UPDATE_WIDGET,
  widget,
});

export const moveWidget: types.MoveWidget = (widgetId, position) => ({
  type: constants.MOVE_WIDGET,
  widgetId,
  position,
});

export const hideWidget: types.HideWidget = (widgetId) => ({
  type: constants.HIDE_WIDGET,
  widgetId,
});

export const revealWidget: types.RevealWidget = (widgetId) => ({
  type: constants.REVEAL_WIDGET,
  widgetId,
});
