import React from "react";
import Carusel from "../Corusel/Carusell";
import Product from "../Products/Product";

export default function MainPage({ setProductInfo, products, setProducts }) {
  
  return (
    <div>
      <Carusel />
      <Product
        setProductInfo={setProductInfo}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}
