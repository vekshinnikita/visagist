import { FC } from "react";
import { WidgetProps } from "../components/CourseDetail";
import {
    Feature as IFeature,
    FeaturesWidget as IFeaturesWidget,
    ChildComponentProps
  } from "@/typing/models"
import { IconTypes } from "@/typing/entities";
import React from "react";

const getIconClass = (icon: IconTypes) => {
    switch (icon) {
      case IconTypes.CHECK_MARK:
        return "fas fa-check";
      default:
        return "";
    }
}

const Feature: FC<ChildComponentProps<IFeature>> = ({child}) => {
  return (
    <div className="feature">
      <i className={getIconClass(child.icon)}></i>
      <h3>{child.title}</h3>
    </div>
  )
}

const FeaturesWidget: FC<WidgetProps<IFeaturesWidget>> = ({widget}) => {

    return (
      <div className="features">
        <div className="container">
            <div className="features-row">
            {widget.children.map((c) => <Feature child={c} key={c.id} />)}
            </div>
        </div>
    </div>
    );
  };
export default FeaturesWidget;