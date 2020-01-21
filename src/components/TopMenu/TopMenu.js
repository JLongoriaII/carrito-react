import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

import Car from "../Car";

import "./TopMenu.scss";

export default function TopMenu(props) {
  const {
    productsCar,
    removeAll,
    result,
    encreaseQuantity,
    decreaseQuantity
  } = props;

  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />
        <MenuNav />
        <Car
          decreaseQuantity={decreaseQuantity}
          encreaseQuantity={encreaseQuantity}
          result={result}
          productsCar={productsCar}
          removeAll={removeAll}
        />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>La casa de los helados</h2>
    </Navbar.Brand>
  );
}

function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
    </Nav>
  );
}
