import { Box, Button, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.css";
import { Api } from "../../Api";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
export default function Product({ setProductInfo }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Chegirmalar");
  useEffect(() => {
    axios.get(`${Api}/products`).then((res) => {
      const initialProducts = res.data.map((product) => ({
        ...product,
        isFavorite: false,
      }));
      setProducts(initialProducts);
      const favoriteItemsFromStorage = localStorage.getItem("favoriteItems");
      if (favoriteItemsFromStorage) {
        const favoriteItems = JSON.parse(favoriteItemsFromStorage);
        const updatedProducts = initialProducts.map((product) => ({
          ...product,
          isFavorite: favoriteItems.some((item) => item.id === product.id),
        }));
        setProducts(updatedProducts);
      }
    });

    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(skeletonTimer);
  }, []);

  useEffect(() => {
    if (showMoreClicked) {
      setShowSkeleton(true);
      const skeletonTimer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1500);

      return () => clearTimeout(skeletonTimer);
    }
  }, [showMoreClicked]);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
    setShowMoreClicked(true);
  };
  const toggleFavorite = (item) => {
    const updatedProducts = products.map((product) => {
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
    setProducts(updatedProducts);
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
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const openProduct = (item) => {
    let OpenItem = JSON.stringify(item);
    localStorage.setItem("OpenProduct", OpenItem);
  };
  return (
    <Box className="Chegirma">
      <Box className="ChegirmaTitle">
        <Link
          to={"chegirma"}
          style={{
            textDecoration: "none",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              paddingTop: "5px",
              display: "flex",
              alignItems: "center",
              gap: ".5vw",
              color: "#000",
              fontFamily: "Inter",
            }}
          >
            <p>Chegirmalar</p>
            <KeyboardArrowRightIcon
              sx={{
                fontSize: "45px",
                position: "relative",
                top: "5px",
              }}
            />
          </h2>
        </Link>
      </Box>
      <Box className="RouteContent">
        <h3
          className={selectedCategory === "Chegirmalar" ? "selected" : ""}
          onClick={() => {
            setSelectedCategory("Chegirmalar");
            handleCategoryClick("Chegirmalar");
          }}
        >
          Chegirmalar
        </h3>
        <h3
          className={selectedCategory === "Mashhur" ? "selected" : ""}
          onClick={() => {
            setSelectedCategory("Mashhur");
            handleCategoryClick("Mashhur");
          }}
        >
          Mashhur
        </h3>
        <h3
          className={selectedCategory === "Maktab uchun" ? "selected" : ""}
          onClick={() => {
            setSelectedCategory("Maktab uchun");
            handleCategoryClick("Maktab uchun");
          }}
        >
          Maktab uchun
        </h3>
      </Box>
      <Box
        className={`DisplayProduct ${
          selectedCategory !== "Chegirmalar" ? "hidden" : ""
        }`}
      >
        <Box className="Product_Content">
          {products.slice(0, visibleCount).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
                localStorage.setItem('OpenItem', item.id)
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                       variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#F1F1F2",
                padding: "15px 0px",
                ":hover": {
                  background: "#E7E5E6",
                },
              }}
              variant="conteined"
              onClick={showMore}
            >
              Yana ko'rstish 20
            </Button>
          )}
          {showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#E7E5E6",
                padding: "15px 0px",
                "&hover": {
                  background: "#DCDCDE",
                },
              }}
              variant="conteined"
            >
              To'liq termani ko'rish
            </Button>
          )}
        </Box>
        <br />
        <br />
        <Box
          sx={{
            width: "99%",
            margin: "auto",
          }}
        >
          <Link to={`muddatli-to'lov`}>
            <img
              src="https://images.uzum.uz/cj566el40v9pplt76ieg/main_page_banner.jpg"
              alt="img"
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
              className="LinksReklam"
            />
          </Link>
        </Box>
        <Link
          to={`muddatli-to'lov`}
          style={{
            textDecoration: "none",
          }}
          className="LinksContent"
        >
          <Box
            style={{
              fontSize: "40px",
              paddingTop: "5px",
              display: "flex",
              alignItems: "center",
              gap: ".5vw",
              color: "#000",
              fontFamily: "Inter",
            }}
          >
            <h3>Halol muddatli to'lov</h3>
            <KeyboardArrowRightIcon
              sx={{
                fontSize: "45px",
                position: "relative",
                top: "5px",
              }}
            />
          </Box>
        </Link>
        <Box className="Product_Content">
          {products.slice(22, 27).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box>
          <Link
            to={`uydan-chiqmasdan`}
            style={{
              textDecoration: "none",
            }}
            className="LinksContent"
          >
            <Box
              style={{
                fontSize: "40px",
                paddingTop: "5px",
                display: "flex",
                alignItems: "center",
                gap: ".5vw",
                color: "#000",
                fontFamily: "Inter",
              }}
            >
              <h3>Uydan chiqmasdan ro’zg’or</h3>
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "45px",
                  position: "relative",
                  top: "5px",
                }}
              />
            </Box>
          </Link>
        </Box>
        <Box className="Product_Content">
          {products.slice(70, 75).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box>
          <Link
            to={`ommabop`}
            style={{
              textDecoration: "none",
            }}
          >
            <Box
              style={{
                fontSize: "40px",
                paddingTop: "5px",
                display: "flex",
                alignItems: "center",
                gap: ".5vw",
                color: "#000",
                fontFamily: "Inter",
              }}
            >
              <h3>Ommabop</h3>
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "45px",
                  position: "relative",
                  top: "5px",
                }}
              />
            </Box>
          </Link>
        </Box>
        <Box className="Product_Content">
          {products.slice(80, 85).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "99%",
            margin: "auto",
          }}
        >
          <Link to={"maktab-bozori"}>
            <img
              src="https://images.uzum.uz/cj3rnodenntd8rfemgb0/main_page_banner.jpg"
              alt="img"
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
              className="LinksReklam"
            />
          </Link>
        </Box>
        <Box>
          <Link
            to={`yangi`}
            style={{
              textDecoration: "none",
            }}
            className="LinksContent"
          >
            <Box
              style={{
                fontSize: "40px",
                paddingTop: "5px",
                display: "flex",
                alignItems: "center",
                gap: ".5vw",
                color: "#000",
                fontFamily: "Inter",
              }}
            >
              <h3>Yangi</h3>
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "45px",
                  position: "relative",
                  top: "5px",
                }}
              />
            </Box>
          </Link>
        </Box>
        <Box className="Product_Content">
          {products.slice(60, 100).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#F1F1F2",
                padding: "15px 0px",
                ":hover": {
                  background: "#E7E5E6",
                },
              }}
              variant="conteined"
              onClick={showMore}
            >
              Yana ko'rstish 20
            </Button>
          )}
          {showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#E7E5E6",
                padding: "15px 0px",
                "&hover": {
                  background: "#DCDCDE",
                },
              }}
              onClick={null}
              variant="conteined"
            >
              To'liq termani ko'rish
            </Button>
          )}
        </Box>
        <br />
        <br />
      </Box>
      <Box
        className={`DisplayProduct2 ${
          selectedCategory !== "Mashhur" ? "hidden" : ""
        }`}
      >
        <Box className="Product_Content">
          {products.slice(10, 100).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#F1F1F2",
                padding: "15px 0px",
                ":hover": {
                  background: "#E7E5E6",
                },
              }}
              variant="conteined"
              onClick={showMore}
            >
              Yana ko'rstish 20
            </Button>
          )}
          {showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#E7E5E6",
                padding: "15px 0px",
                "&hover": {
                  background: "#DCDCDE",
                },
              }}
              onClick={() => {
                setVisibleCount(products.length);
                setShowMoreClicked(true);
              }}
              variant="conteined"
            >
              To'liq termani ko'rish
            </Button>
          )}
        </Box>
        <br />
        <br />
      </Box>
      <Box
        className={`DisplayProduct3 ${
          selectedCategory !== "Maktab uchun" ? "hidden" : ""
        }`}
      >
        <Box className="Product_Content">
          {products.slice(60, 100).map((item, index) => (
            <Box
              className="Card_Product"
              onClick={() => {
                openProduct(item);
                setProductInfo(item);
              }}
            >
              {showSkeleton ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"120%"}
                    sx={{
                      position: "relative",
                      mt: "-52%",
                    }}
                  />
                  <Skeleton
                    width={"94%"}
                    height={40}
                    sx={{
                      position: "relative",
                      mt: "-25%",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Skeleton
                    width={"50%"}
                    height={40}
                    sx={{
                      position: "relative",
                      borderRadius: "8px",
                      ml: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "10%",
                      paddingLeft: "4%",
                    }}
                  >
                    <Skeleton
                      width={"28%"}
                      height={40}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        ml: "1",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={"40px"}
                      height={"40px"}
                      sx={{
                        position: "relative",
                        mr: "25px",
                      }}
                    />
                  </Box>
                </>
              ) : (
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
                    to={`product/${item.catigoris}/${item.description}/${item.id}`}
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
                              bottom: "2px",
                              fontFamily: "Inter",
                            }}
                          >
                            <p>
                              <del
                                className="previousprice"
                                style={{
                                  position: "absolute",
                                  bottom: "42px",
                                  color: "#7E7E7E",
                                  left: "5px",
                                  paddingTop: "5px",
                                }}
                              >{`${item.previousprice
                                .toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  " "
                                )} so'm`}</del>
                            </p>
                            <p
                              className="price"
                              style={{
                                position: "relative",
                                width: "100%",
                                left: "5px",
                                bottom: "-5px",
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
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#F1F1F2",
                padding: "15px 0px",
                ":hover": {
                  background: "#E7E5E6",
                },
              }}
              variant="conteined"
              onClick={showMore}
            >
              Yana ko'rstish 20
            </Button>
          )}
          {showMoreClicked && visibleCount < products.length && (
            <Button
              className="MoreProduct"
              sx={{
                background: "#E7E5E6",
                padding: "15px 0px",
                "&hover": {
                  background: "#DCDCDE",
                },
              }}
              variant="conteined"
              onClick={() => {
                setVisibleCount(products.length);
                setShowMoreClicked(true);
              }}
            >
              To'liq termani ko'rish
            </Button>
          )}
        </Box>
        <br />
        <br />
      </Box>
    </Box>
  );
}
