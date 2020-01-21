import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import {
  removeArrayDuplications,
  countDuplicatesItemArray
} from "../../utils/arrayFunction.js";
import { BASE_PATH } from "../../utils/constants.js";

import "./Car.scss";

export default function Car(props) {
  const {
    productsCar,
    removeAll,
    result,
    encreaseQuantity,
    decreaseQuantity
  } = props;
  const [carOpen, setCarOpen] = useState(false);
  const widthCarContent = carOpen ? 400 : 0;
  const [singelProductsCar, setSingelProductsCar] = useState([]);
  const [carTotalPrice, setCarTotalPrice] = useState(0);

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsId = removeArrayDuplications(productsCar);
    allProductsId.forEach(productId => {
      const quantity = countDuplicatesItemArray(productId, productsCar);
      const productValue = {
        id: productId,
        quantity: quantity
      };
      productData.push(productValue);
    });

    if (!result.loading && result.result) {
      result.result.forEach(product => {
        productData.forEach(item => {
          if (product.id == item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }

    setCarTotalPrice(totalPrice);
  }, [productsCar, result]);

  useEffect(() => {
    const allProductsId = removeArrayDuplications(productsCar);
    setSingelProductsCar(allProductsId);
  }, [productsCar]);

  const openCar = () => {
    setCarOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCar = () => {
    setCarOpen(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <>
      <Button variant="link" className="car">
        {productsCar.length > 0 ? (
          <CartFull onClick={openCar} />
        ) : (
          <CartEmpty onClick={openCar} />
        )}
      </Button>
      <div className="car-content" style={{ width: widthCarContent }}>
        <CarContentHeader removeAll={removeAll} closeCar={closeCar} />
        <div className="car-content__products">
          {singelProductsCar.map((idProductsCar, index) => (
            <CarContentProducts
              key={index}
              products={result}
              idsProductsCar={productsCar}
              idProductCar={idProductsCar}
              encreaseQuantity={encreaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CarContentFooter carTotalPrice={carTotalPrice} />
      </div>
    </>
  );
}

function CarContentHeader(props) {
  const { closeCar, removeAll } = props;

  return (
    <div className="car-content__header">
      <div>
        <Close onClick={closeCar} />
        <h2>Carrito</h2>
      </div>
      <Button onClick={removeAll} variant="link">
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CarContentProducts(props) {
  const {
    products: { loading, result },
    idsProductsCar,
    idProductCar,
    encreaseQuantity,
    decreaseQuantity
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCar == product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductsCar);
        return (
          <RenderProduct
            decreaseQuantity={decreaseQuantity}
            encreaseQuantity={encreaseQuantity}
            key={index}
            product={product}
            quantity={quantity}
          />
        );
      }
    });
  }

  return null;
}

function RenderProduct(props) {
  const { product, quantity, encreaseQuantity, decreaseQuantity } = props;
  return (
    <div className="car-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
      <div className="car-content__product-info">
        <div>
          {product.name.length > 25 ? (
            <h3>{product.name.substr(0, 25)}...</h3>
          ) : (
            <h3>{product.name}</h3>
          )}
          <p>{product.price.toFixed(2)} $ / ud.</p>
        </div>
        <div>
          <p>En carro: {quantity} ud.</p>
          <div>
            <button onClick={() => encreaseQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarContentFooter(props) {
  const { carTotalPrice } = props;

  return (
    <div className="car-content__footer">
      <div>
        <p>Total Aproximado: </p>
        <p>{carTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Tramitar Pedido</Button>
    </div>
  );
}
