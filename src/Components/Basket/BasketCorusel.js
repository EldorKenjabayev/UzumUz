import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Products/Product.css";
import "../Products/OpenProduct/CoruselOpenProduct";
export default function BasketCorusel({ setProductInfo, productInfo }) {
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/products?_limit=18').then((res) => {
          setPopular(res.data);
        }); 
      }, []);
  const [favorite, setFavorite] = useState([]);
  const toggleFavorite = (item) => {
    const updatedProducts = productInfo.map((product) => {
      if (product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }
      return product;
    });

    localStorage.setItem(
      "favoriteItems",
      JSON.stringify(updatedProducts.filter((product) => product.isFavorite))
    );
   
  }

  const removeFavorite = (itemId) => {
    const updatedFavorites = favorite.filter((item) => item.id !== itemId);
    setFavorite(updatedFavorites);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));
  };

  const AddToBacket = (item) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemExistsInCart = cartItems.some(
      (cartItem) => cartItem.id === item.id
    );
    if (!itemExistsInCart) {
      const updatedCartItems = [...cartItems, item];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };
  const openProduct = (item) => {
    let OpenItem = JSON.stringify(item);
    localStorage.setItem("OpenProduct", OpenItem);
  };



  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 5000, min: 1300 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 860 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 860, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 504, min: 477 },
      items: 2,
    },
    mobile2: {
      breakpoint: { max: 400, min: 100 },
      items: 1,
    },
  };
  return (
    <Box>
      <h3 className="oxshash">Mashxur mahsulotlar</h3>
      <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px" >
        {popular.map((item, index) => (
          <Box
            sx={{
              marginRight: "1vw",
            }}
            onClick={() => {
              openProduct(item);
              setProductInfo(item);
            }}
          >
            <Box>
              <Box
                className="AddToCard"
                onClick={(e) => {
                  e.stopPropagation();
                  AddToBacket(item);
                }}
                sx={{
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  position: "absolute",
                  right: "10px",
                  bottom: "18px",
                  zIndex: "1000",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #C8C8C8",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                    color: "blue",
                  },
                }}
              >
                <svg
                  data-v-b3e9397c
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ui-icon  add-cart-icon"
                >
                  <path
                    d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
                    fill="black"
                  ></path>
                  <path
                    d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
                    fill="black"
                  ></path>
                </svg>
              </Box>
              <Box
                className="Heart_Icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                  removeFavorite(item);
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="like"
                  className="ui-icon "
                >
                  <path
                    d="M5.95 2C8.51792 2 10 4.15234 10 4.15234C10 4.15234 11.485 2 14.05 2C16.705 2 19 4.07 19 6.95C19 11.1805 12.5604 15.6197 10.3651 17.5603C10.1582 17.7432 9.84179 17.7432 9.63488 17.5603C7.44056 15.6209 1 11.1803 1 6.95C1 4.07 3.295 2 5.95 2Z"
                    fill={item.isFavorite ? "#9457EB" : "#fff"}
                    fillOpacity="0.8"
                  ></path>
                  <path
                    d="M1 6.86486C1 4.20297 3.15017 2 5.86486 2C7.98685 2 9.35921 3.35876 10 4.18673C10.6408 3.35876 12.0132 2 14.1351 2C16.8506 2 19 4.20302 19 6.86486C19 8.02987 18.5328 9.18622 17.8534 10.265C17.1716 11.3476 16.252 12.3903 15.29 13.3377C13.9567 14.6508 12.4757 15.8387 11.4134 16.6907C10.9618 17.0529 10.5859 17.3544 10.3293 17.579C10.1407 17.7439 9.85926 17.7439 9.67075 17.579C9.41405 17.3544 9.03815 17.0529 8.58659 16.6907C7.52431 15.8387 6.04326 14.6508 4.70997 13.3377C3.74802 12.3903 2.82836 11.3476 2.14659 10.265C1.46724 9.18622 1 8.02987 1 6.86486ZM5.86486 3C3.70929 3 2 4.74838 2 6.86486C2 7.76743 2.36553 8.73607 2.99277 9.73208C3.61759 10.7242 4.47833 11.706 5.41165 12.6252C6.71033 13.9042 8.08423 15.005 9.13396 15.8461C9.45728 16.1052 9.74985 16.3396 10 16.547C10.2501 16.3396 10.5427 16.1052 10.866 15.8461C11.9158 15.005 13.2897 13.9042 14.5883 12.6252C15.5217 11.706 16.3824 10.7242 17.0072 9.73208C17.6345 8.73607 18 7.76743 18 6.86486C18 4.74833 16.2914 3 14.1351 3C12.0406 3 10.8181 4.70211 10.5033 5.21028C10.2727 5.5825 9.72727 5.58249 9.4967 5.21027C9.1819 4.7021 7.95944 3 5.86486 3Z"
                    fill={item.isFavorite ? "#9457EB" : "#000"}
                  ></path>
                </svg>
              </Box>
              <Link
                className="Card_Product_Link "
                key={index}
              >
                <Box>
                  <Box className="Card_Product_ImgContainer">
                    <img
                      src={item.img[0]}
                      alt="png"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      className="description"
                      style={{
                        padding: "4px 5px 0px 5px",
                        fontFamily: "Inter",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "350px",
                      }}
                    >
                      {item.description.length > 50
                        ? item.description.slice(0, 50) + "..."
                        : item.description}
                    </p>
                    <Box
                      className="satars"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        color: "#5c5c5c",
                        position: "relative",
                        top: "-13px",
                        fontFamily: "Inter",
                        paddingLeft: "7px",
                      }}
                    >
                      <p
                        style={{
                          color: "#F5A623",
                        }}
                      >
                        <StarIcon />
                      </p>
                      <p>{`${item.stars.star} (${item.stars.countstarts} baho)`}</p>
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        top: "-32px",
                        paddingBottom:"23px",
                      }}
                    >
                      <p
                        style={{
                          padding: "2px 8px",
                          fontFamily: "Inter",
                        }}
                      >
                        <mark
                          style={{
                            padding: "4px",
                            borderRadius: "6px",
                          }}
                        >
                          {item.installmentplan}
                        </mark>
                      </p>
                    </Box>
                  </Box>
                  <Box
                    className="PriceAndBacket"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0% 3%",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          width: "100%",
                          position: "absolute",
                          bottom: "5px",
                          fontFamily: "Inter",
                        }}
                      >
                        <p>
                          <del
                            className="previousprice"
                            style={{
                              position: 'absolute',
                              bottom: "42px",
                              color: "#7E7E7E",
                              left: "5px",
                              paddingTop: "5px",
                            }}
                          >{`${item.previousprice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</del>
                        </p>
                        <p
                          className="price"
                          style={{
                            position: "relative",
                            width: "100%",
                            left: "5px",
                            bottom: "-10px",
                            paddingTop:'18px',
                            fontWeight: "500",
                          }}
                        >{`${item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}so'm`}</p>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

