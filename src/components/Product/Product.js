import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { BASE_PATH } from "../../utils/constants.js";

import "./Product.scss";

export default function Product(props) {
  const {
    product: { id, name, extraInfo, image, price },
    addProductCar
  } = props;

  return (
    <Col xs={3} className="product">
      <Card>
        <Card.Img variant="top" src={`${BASE_PATH}/${image}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{extraInfo}</Card.Text>
          <Card.Text>{price.toFixed(2)} $ / Unidad</Card.Text>
          <Button onClick={() => addProductCar(id, name)}>
            Añadir al carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
