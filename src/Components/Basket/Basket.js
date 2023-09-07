import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./Basket.css";
import { Link } from "react-router-dom";
import iconprogres from "./сшк-transformed.png";
import BasketCorusel from "./BasketCorusel";

export default function Basket() {
  const [basket, setBasket] = useState([]);
  const [tooltipStates, setTooltipStates] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let BasketProducts = localStorage.getItem("cartItems");
    setBasket(JSON.parse(BasketProducts));
  }, []);
  useEffect(() => {
    let BasketProducts = localStorage.getItem("cartItems");
    const initialTooltipStates = {};
    if (BasketProducts) {
      const parsedBasket = JSON.parse(BasketProducts);
      parsedBasket.forEach((item) => {
        initialTooltipStates[item.id] = false;
      });
      setBasket(parsedBasket);
      setTooltipStates(initialTooltipStates);
    }
  }, []);
  const calculateTotalAmount = () => {
    let total = 0;
    if (basket && basket.length > 0) {
      basket.forEach((item) => {
        total += item.count * item.price;
      });
    }
    return total;
  };
  useEffect(() => {
    let BasketProducts = localStorage.getItem("cartItems");
    setBasket(JSON.parse(BasketProducts));
    setTotalAmount(calculateTotalAmount()); 
  }, []);
  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [basket]); 
  
    

  const handleDecrease = (item) => {
    if (item.count > 1) {
      item.count -= 1;

      setTooltipStates((prevState) => ({
        ...prevState,
        [item.id]: false, // Закрыть Tooltip при уменьшении
      }));
    }
  };

  const handleIncrease = (item) => {
    if (item.count < item.things) {
      const updatedBasket = basket.map((basketItem) => {
        if (basketItem.id === item.id) {
          return {
            ...basketItem,
            count: basketItem.count + 1,
          };
        }
        return basketItem;
      });

      setBasket(updatedBasket);

      if (item.count + 1 === item.things) {
        setTooltipStates((prevState) => ({
          ...prevState,
          [item.id]: true,
        }));
      }
    }
  };

  const handleMouseEnter = (itemId) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));
  };

  const handleMouseLeave = (itemId) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };
  const handleDelete = (itemId) => {
    const updatedBasket = basket.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  const totalPreviousPrice = basket.reduce((total, item) => {
    if (!isNaN(item.previousprice)) {
      return total + item.previousprice * item.count;
    }
    return total;
  }, 0);
  return (
    <Box>
      {basket == null || basket.length === 0 ? (
        <Box
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontFamily: "Inter",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <img
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="img"
              style={{
                width: "25%",
              }}
            />
            <h1 className="TitleBasketEmptyH1" style={{
              textAlign:'center'
            }}>Savatda hozircha mahsulot yoʻq</h1>
            <h3 className="TitleBasketEmptyH3"
              style={{
                position: "relative",
                top: "-14px",
                color: "#636363",
                fontWeight: "400",
                textAlign:'center'
              }}
            >
              Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulотni
              qidiruv orqali toping
            </h3>
            <Box>
              <Link to={"/"}>
                <button
                className="BtnCardempty"
                  style={{
                    borderRadius: "10px",
                    fontFamily: "Inter",
                    border: "none",
                    background: "#7000FF",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Bosh sahifaga qaytish
                </button>
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box>
            <h3
              className="TitleBasket"
              style={{
                fontFamily: "Roboto",
                fontWeight: "500",
              }}
            >
              Savatingiz,
              <span
                style={{
                  color: "#878787",
                }}
              >{`${basket.length}  mahsulot`}</span>
            </h3>
          </Box>
          <Box className="basket">
            <Box
              sx={{
                border: "2px solid hsla(220,4%,48%,.2)",
                padding: "2%",
                height: "10%",
              }}
              className="card-basket"
            >
              {basket.map((item, index) => (
                <Box
                  className="basketImg"
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #E0E0E0",
                    borderBottom: "1px solid #E0E0E0",
                    padding: "1%",
                  }}
                >
                  <Box className="imgProductBasket">
                    <img
                      src={item.img[0]}
                      alt="img"
                      style={{
                        width: "70%",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "85%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                      >
                        {item.description}
                      </p>
                      <button
                        className="btndelete"
                        style={{
                          cursor: "pointer",
                          border: "none",
                          background: "none",
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          transition: ".1s all linear",
                          fontFamily: "Inter",
                          fontSize: "12px",
                        }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: "27px",
                          }}
                        />
                        <p>
                          Yo`q <br /> qilish
                        </p>
                      </button>
                    </Box>
                    <Box
                      className="counterPrice"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                      }}
                    >
                      <Box>
                        <p>{`Sotuvchi: ${item.vendor}`}</p>
                      </Box>
                      <Box
                        className="counterMx"
                        sx={{
                          display: "flex",
                          gap: "1vw",
                          alignItems: "center",
                          border: ".5px solid #cccc",
                     
                          borderRadius: "7px",
                          height: "40px",
                          padding: "0px 10px",
                        }}
                      >
                        <button
                          className="Counter"
                          onClick={() => handleDecrease(item)}
                        >
                          <RemoveIcon sx={{ width: "18px" }} />
                        </button>
                        <h3>{item.count}</h3>
                        <Tooltip
                          open={tooltipStates[item.id] && item.things >= 1}
                          title={`Sotuvda faqat ${item.things} dona bor`}
                          arrow
                          enterTouchDelay={0}
                          PopperProps={{
                            onMouseEnter: () => handleMouseEnter(item.id),
                            onMouseLeave: () => handleMouseLeave(item.id),
                          }}
                        >
                          <div>
                            <button
                              className="Counter"
                              onClick={() => handleIncrease(item)}
                            >
                              <AddIcon sx={{ width: "18px" }} />
                            </button>
                          </div>
                        </Tooltip>
                      </Box>
                      <Box
                        className="count  erPrice"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "18px",
                            position: "relative",
                            top: "12px",
                          }}
                        >{`${(item.count * item.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</h3>
                        <p
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            color: "#797575",
                            textAlign: "end",
                          }}
                        >
                          <del>
                            {item.previousprice && !isNaN(item.previousprice)
                              ? (item.count * item.previousprice)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                              : "Narx korsatilmagan"}
                          </del>
                        </p>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className="totalAmount">
              <Box className="pochta">
                <img
                  src={iconprogres}
                  alt="png"
                  className="imgLogoCircule"
                  style={{
                    position: "relative",
                  }}
                />
                <Box
                  sx={{
                    fontFamily: "Roboto",
                  }}
                >
                  <h3>
                    Buyurtmangizni rasmiy topshirish&nbsp;
                    <span
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      punktiga bepul yetkazib beramiz
                    </span>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "13px",
                      color: "#212121",
                    }}
                  >
                    Eshikkacha yetkazib berishgacha yana 455 000 so'm
                  </p>
                </Box>
              </Box>
              <Box
                sx={{
                  fontFamily: "Roboto",
                }}
              >
                <h2>Buyurtmangiz</h2>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Roboto",
                  }}
                >
                  <p>{`Mahsulotlar : (${basket.length})`}</p>
                  <p>{`${totalPreviousPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</p>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #7000FF",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    color: "#7000FF",
                    width: "98%",
                    margin: "auto",
                  }}
                >
                  <p>Yetkazib berish M09 6 (Erta)</p>
                </Box>
                <Box
                  sx={{
                    fontFamily: "Roboto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Jami:</p>
                  <Box>
                    <h3
                      style={{
                        textAlign: "end",
                      }}
                    >{`${totalAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</h3>
                    <p
                      style={{
                        color: "#00C853",
                        fontSize: "13px",
                      }}
                    >{`Tejavongiz: ${(totalPreviousPrice - totalAmount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</p>
                  </Box>
                </Box>
                <Box
                  sx={{
                    justifyContent: "center",
                  }}
                  className="Btnpay1"
                >
                  <Button
                    sx={{
                      width: "90%",
                      padding: "8px 0",
                      textAlign: "center",
                      borderRadius: "10px",
                      color: "#fff",
                      background: "#7000ff",
                      ":hover": {
                        background: "#5d00d6",
                      },
                      ":active": {
                        background: "#420099",
                      },
                      fontFamily: "Inter",
                      fontSize: "11px",
                    }}
                  >
                    Rasmiylashtirishga oʻtish
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <BasketCorusel />
          <Box></Box>
          <Box
            className="Btnpay"
            sx={{
              fontFamily: "Roboto",
            }}
          >
            <Box>
              <p>Buyurtmangiz</p>
              <h3>{`${totalAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</h3>
            </Box>
            <Button
              sx={{
                width: "19%",
                padding: "8px 0",
                textAlign: "center",
                borderRadius: "10px",
                color: "#fff",
                background: "#7000ff",
                ":hover": {
                  background: "#5d00d6",
                },
                ":active": {
                  background: "#420099",
                },
                fontFamily: "Inter",
                fontSize: "10px",
              }}
            >
              Rasmiylashtirish
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}