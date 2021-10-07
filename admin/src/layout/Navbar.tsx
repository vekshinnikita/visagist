import { selectCurrentPage } from "@/selectors";
import { Pages } from "@/types/enumerates";
import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink, NavLinkProps } from "react-router-dom";

interface HighlightedNavLinkProps extends NavLinkProps {
  page: Pages;
}

const HighlightedNavLink: FC<HighlightedNavLinkProps> = ({
  page,
  children,
  ...rest
}) => {
  const currentPage = useSelector(selectCurrentPage);

  return (
    <NavLink
      style={{ color: currentPage === page ? "var(--blue)" : undefined }}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

const Navbar: FC = () => {
  return (
    <header>
      <div className="logo">LOGO</div>
      <div className="menu">
        <nav>
          <HighlightedNavLink page={Pages.OVERVIEW} to="/">
            Обзор
          </HighlightedNavLink>
          <HighlightedNavLink page={Pages.COURSES} to="/courses/">
            Курсы
          </HighlightedNavLink>
          <HighlightedNavLink page={Pages.REVIEWS} to="/reviews/">
            Отзывы
          </HighlightedNavLink>
          <HighlightedNavLink page={Pages.STUDENTS_WORK} to="/students_work/">
            Работы Студентов
          </HighlightedNavLink>
        </nav>
        <div className="extra-nav">
          <div className="icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
