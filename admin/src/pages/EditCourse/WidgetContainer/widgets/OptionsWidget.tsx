import { FC } from "react";
import {
  Option as IOption,
  OptionsWidget as IOptionsWidget,
} from "@/types/models";
import { IconTypes } from "@/types/enumerates";
import { WidgetProps } from "../WidgetContainer";
import { sortDraggableByPosition } from "@/utils";

interface OptionProps {
  option: IOption;
  isEditing: boolean;
  updateOption: (option: IOption) => void;
}

const Option: FC<OptionProps> = ({ option, isEditing, updateOption }) => {
  const getIconClass = (icon: IconTypes) => {
    switch (icon) {
      case IconTypes.CHECK_MARK:
        return "fas fa-check";
      default:
        return "";
    }
  };

  if (isEditing) {
    return (
      <div className="option">
        <input
          type="text"
          className="base-input"
          placeholder="Опция"
          value={option.title}
          onChange={(e) => updateOption({ ...option, title: e.target.value })}
        />
      </div>
    );
  }

  return (
    <div className="option">
      <i className={getIconClass(option.icon)}></i>
      <h3>{option.title}</h3>
    </div>
  );
};

const OptionsWidget: FC<WidgetProps<IOptionsWidget>> = ({
  widget,
  isEditing,
  updateWidget,
}) => {
  const getIdForNewOption = (options: IOption[]) =>
    Math.max(...options.map((o) => o.id), 0) + 1;

  const getPositionForNewOption = (options: IOption[]) =>
    Math.max(...options.map((o) => o.position), 0) + 1;

  const createOption = () => {
    console.log(getIdForNewOption(widget.options));
    updateWidget({
      ...widget,
      options: sortDraggableByPosition([
        ...widget.options,
        {
          id: getIdForNewOption(widget.options),
          icon: IconTypes.CHECK_MARK,
          title: "",
          position: getPositionForNewOption(widget.options),
        } as IOption,
      ]),
    });
  };

  const updateOption = (option: IOption) => {
    updateWidget({
      ...widget,
      options: sortDraggableByPosition([
        ...widget.options.filter((o) => o.id !== option.id),
        option,
      ]),
    });
  };

  return (
    <div className="widget options-widget">
      {widget.options.map((o) => (
        <Option
          option={o}
          isEditing={isEditing}
          updateOption={(option) => updateOption(option)}
          key={o.id}
        />
      ))}
      {isEditing && (
        <div className="option create-option" onClick={createOption}>
          +
        </div>
      )}
    </div>
  );
};

export default OptionsWidget;
