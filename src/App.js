import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import useFetch from "./hook/useFetch.js";

import { URL_API_PRODUCTS, STORAGE_PRODUCTS_CAR } from "./utils/constants.js";
import { removeItemArray } from "./utils/arrayFunction";

function App() {
  const result = useFetch(URL_API_PRODUCTS, null);
  const [productsCar, setProductsCar] = useState([]);

  useEffect(() => {
    getProductsCar();
  }, []);

  const getProductsCar = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CAR);

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCar(idsProductsSplit);
    } else {
      setProductsCar([]);
    }
  };

  const addProductCar = (id, name) => {
    const idsProducts = productsCar;
    idsProducts.push(id);
    setProductsCar(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CAR, productsCar);
    getProductsCar();
    toast.success(`${name} añadido al carrito correctamente.`);
  };

  const removeAll = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CAR);

    if (idsProducts) {
      localStorage.removeItem(STORAGE_PRODUCTS_CAR);
      getProductsCar();
      toast.success("El carrito se ha vaciado con éxito.");
    } else {
      toast.warn("El carrito está vacío");
    }
  };

  const encreaseQuantity = id => {
    const arrayItemsCar = productsCar;
    arrayItemsCar.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CAR, arrayItemsCar);
    getProductsCar();
  };

  const decreaseQuantity = id => {
    const arrayItemsCar = productsCar;
    const result = removeItemArray(arrayItemsCar, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CAR, result);
    getProductsCar();
  };

  return (
    <div className="App">
      <TopMenu
        result={result}
        productsCar={productsCar}
        removeAll={removeAll}
        encreaseQuantity={encreaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      <Products products={result} addProductCar={addProductCar} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
