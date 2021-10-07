import React, { FC } from "react";
import { Link } from "react-router-dom";

interface ProgramProps {
  imageUrl: string;
  link: string;
  title: string;
}

const Program: FC<ProgramProps> = ({ imageUrl, link, title }) => {
  return (
    <Link
      to={link}
      className="program"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {title}
    </Link>
  );
};

const programs: ProgramProps[] = [
  {
    imageUrl: "/static/Ф.3.1.jpg",
    link: "/course/visagiste/",
    title: "Базовый курс «Визажист»",
  },
  {
    imageUrl: "/static/Ф.3.2.jpg",
    link: "/course/wedding-s/",
    title: "Свадебный стилист",
  },
  {
    imageUrl: "/static/Ф.3.3.jpg",
    link: "/course/visagiste/",
    title: "Базовый курс «Визажист»",
  },
  {
    imageUrl: "/static/Ф.3.4.jpg",
    link: "/course/visagiste/",
    title: "Базовый курс «Визажист»",
  },
];

const VisagisteCourse: FC = () => {
  return (
    <section className="visagiste-course">
      <div className="title">
        <h2>КУРСЫ ОБУЧЕНИЯ ДЛЯ ВИЗАЖИСТОВ</h2>
      </div>
      <div className="programs"></div>
    </section>
  );
};

export default VisagisteCourse;
