import React, { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Pages } from "@/typing/entities";
import { selectCurrentPage } from "@/selectors";

interface NavbarLink extends NavLinkProps {
  page: Pages;
}

const HighlightedNavLink: FC<NavbarLink> = ({ page, children, ...rest }) => {
  const currentPage = useSelector(selectCurrentPage);

  return (
    <NavLink
      {...rest}
      style={{
        color: currentPage === page ? "var(--pink)" : undefined,
      }}
    >
      {children}
    </NavLink>
  );
};

const Navbar: FC = () => {
  return (
    <header>
      <NavLink to="/" className="logo">
        <span className="text">LOGO</span>
        <span className="deco-line"></span>
      </NavLink>
      <div className="menu">
        <nav>
          <HighlightedNavLink to="/" page={Pages.HOME}>
            Главная
          </HighlightedNavLink>
          <HighlightedNavLink to="/courses/" page={Pages.COURSES}>
            Курсы
          </HighlightedNavLink>
          <HighlightedNavLink to="/services/" page={Pages.SERVICES}>
            Услуги
          </HighlightedNavLink>
          <HighlightedNavLink to="/reviews/" page={Pages.REVIEWS}>
            Отзывы
          </HighlightedNavLink>
          <HighlightedNavLink to="/contacts/" page={Pages.CONTACTS}>
            Контакты
          </HighlightedNavLink>
        </nav>
        <div className="toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
