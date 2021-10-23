import { CourseProgramWidget, CourseProgramModule, ChildComponentProps } from "@/typing/models";
import React from "react";
import { FC } from "react";
import { WidgetProps } from "../components/CourseDetail";


const CourseProgram: FC<ChildComponentProps<CourseProgramModule>> = ({child}) => {
  return (
      <div className="simular-course">
        <div className="sc-body">
            <h4>{child.title}</h4>
            <div
                dangerouslySetInnerHTML={{ __html: child.content }}
            ></div>
        </div>
      </div>
  )
}

const CourseProgramWidget: FC<WidgetProps<CourseProgramWidget>> = ({widget}) => {
    

  return (
    <div className="child-wrapper course-program-module-wrapper">
      <div className="course-module">
        <div className="container">
            <div className="sc">
                <div className="simular-course-title after">
                    <h2>МОДУЛИ ПРОГРАММЫ ОБУЧЕНИЯ</h2>
                </div>
                {widget.children.map((program) => <CourseProgram child={program} key={program.id}/>)}
            </div>
        </div>
    </div>
        
    
    </div>
  );
};

export default CourseProgramWidget;
