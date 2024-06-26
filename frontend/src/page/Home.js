import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductBigSale from "../components/ProductBigSale";
import ProductForYou from "../components/ProductForYou";
import { getListProduct } from "../services/API/productApi";

export default function Home() {
  const listProduct = useSelector((state) => state.product.products?.allProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    getListProduct(dispatch); // Assurez-vous que cette fonction récupère tous les produits
  }, [dispatch]);

  // Filtrer les produits en promotion (vous pouvez ajuster ou supprimer cette partie si vous ne souhaitez pas de filtrage)
  const productDiscount = listProduct?.filter((product) => {
    return product.promotionPercent >= 20;
  });

  return (
    <div className="page-holder">
      <div className="header bg-white">
        <div className="container">
          <div
            className="hero pb-3 bg-cover bg-center d-flex align-items-center"
            style={{
              backgroundImage: `url("/image/banner1.jpg")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container py-5">
              <div className="row px-4 px-lg-5">
                <div className="col-lg-6">
                  <p className="text-muted small text-uppercase mb-2">
                    All art. All love.
                  </p>
                  <h1 className="h2 text-uppercase mb-3">
                    Welcome to fava world
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="text-center">
              <p className="small text-muted small text-uppercase mb-1">
                Carefully created collections
              </p>
            </div>
            </div>
          <div className="py-5" id="section_product">
            <div className="row d-block">
              <ProductBigSale productDiscount={productDiscount} />
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="small text-muted small text-uppercase mb-1">
                Made the hard way
              </p>
              <h2 className="h5 text-uppercase mb-4">Product Spend For You</h2>
            </div>
            <div className="row d-block">
              <ProductForYou listProduct={listProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
