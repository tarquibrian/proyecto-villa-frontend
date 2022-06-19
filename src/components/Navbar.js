import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { menuData } from "../data/MenuData";
import { Button } from "./Button";
import Bars from "../images/bars.svg";
// import { normalizeUnits } from "moment";

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
`;

const NavLink = css`
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: none;
    color: #fff;
    border-radius: 50px;
    transform: translateY(-2px);
  }
`;

const Logo = styled(Link)`
  ${NavLink}
  font-style: italic;
  font-weight: 700;
  transition: text-shadow 200ms;

  &:hover {
    text-shadow: red -3px 0, blue -3px 0;
  }
`;

const MenuBars = styled.i`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    background-image: url(${Bars});
    background-size: contain;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  border-radius: 50px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Navbar = ({ toggle }) => {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  const changeBackground = () => {
    if (window.pageYOffset >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener("scroll", changeBackground);
    };

    watchScroll();

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  let style = {
    background:
      navbar || location.pathname !== "/"
        ? "linear-gradient(#27EF9F, #0DB8DE)"
        : "rgba(15, 15, 15, 0.4)",
    // "-webkit-backdrop-filter": navbar || location.pathname !== "/"
    // ? ""
    // : "blur(9px)",
    "backdrop-filter":
      navbar || location.pathname !== "/" ? "" : "blur(15px)",
    transition: "0.3s",
    "box-shadow":
      navbar || location.pathname !== "/"
        ? "rgb(38, 57, 77) 0px 8px 20px"
        : "none",
  };
  let style2 = {
    color: navbar || location.pathname !== "/" ? "#000" : "#fff",
  };
  return (
    <Nav style={style}>
      <Logo to="/" style={style2}>
        GOBIERNO DE VILLA RIVERO
      </Logo>
      <MenuBars onClick={toggle} />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavMenuLinks to={item.link} key={index} style={style2}>
            {item.title}
          </NavMenuLinks>
        ))}
      </NavMenu>
      <NavBtn>
        <Button to="/Login" primary="true" round="true">
          INICIAR SESIÓN
        </Button>
      </NavBtn>
    </Nav>
  );
};
