import { FC, useEffect, useState } from "react";
import {
  Feature as IFeature,
  FeaturesWidget as IFeaturesWidget,
} from "@/types/models";
import { IconTypes } from "@/types/enumerates";
import { WidgetProps } from "../WidgetContainer";
import ChildrenWrapper, {
  ChildComponentProps,
} from "./components/ChildrenWrapper";
import Child from "./components/Child";

const Feature: FC<ChildComponentProps<IFeature>> = ({
  child: feature,
  updateChild: updateFeature,
  ...props
}) => {
  const [title, setTitle] = useState(feature.title);

  useEffect(() => {
    setTitle(feature.title);
  }, [feature]);

  const getIconClass = (icon: IconTypes) => {
    switch (icon) {
      case IconTypes.CHECK_MARK:
        return "fas fa-check";
      default:
        return "";
    }
  };

  const cancelChanges = () => {
    setTitle(feature.title);
  };

  const submitChanges = () => {
    updateFeature({ ...feature, title });
  };

  return (
    <div className="child-wrapper feature-wrapper">
      <Child
        {...props}
        submit={submitChanges}
        cancel={cancelChanges}
        editingModeNode={
          <input
            type="text"
            className="base-input"
            placeholder="Особенность"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        }
        readingModeNode={
          <>
            <i className={getIconClass(feature.icon)}></i>
            <h3>{feature.title}</h3>
          </>
        }
      />
    </div>
  );
};

const FeaturesWidget: FC<WidgetProps<IFeaturesWidget>> = ({ ...props }) => {
  const featureInitValue = {
    icon: IconTypes.CHECK_MARK,
    title: "",
  };

  return (
    <div className="widget widget-with-children features-widget">
      <ChildrenWrapper
        {...props}
        ChildComponent={Feature}
        childInitValue={featureInitValue}
      />
    </div>
  );
};

export const FeaturesWidgetIcon: FC = () => (
  <div className="widget-icon-container">
    <div className="widget-icon features-widget-icon">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <h4>Особенности</h4>
  </div>
);

export default FeaturesWidget;
