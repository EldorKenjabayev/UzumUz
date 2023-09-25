import React, { useEffect, useState } from "react";
import DemoCarousel from "../../Corusel/DemoCarousel ";
import { Box, Button } from "@mui/material";
import "./OpenProducts.css";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CoruselOpenProduct from "./CoruselOpenProduct";
import axios from "axios";
import { Api } from "../../../Api";
export default function OpenProduct({ productInfo, setProductInfo }) {
  const [openinfo, setOpenInfo] = useState([])
  const [quantity, setQuantity] = useState(1);
  const [infoandcomments, setInfoAndComments] = useState("Info");
useEffect(()=>{
  let openItemId = localStorage.getItem('OpenItem');
  axios.get(`${Api}`).then((res)=>{
    const fetcheData = res.data; 
    const filtredData = fetcheData.filter((item) => item.id === openItemId)
    setOpenInfo(filtredData)
  })
},[])
console.log(openinfo);
console.log(openinfo);
  const calculateTotal = () => {
    const total = productInfo.price * quantity;
    return total.toFixed(0);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < productInfo.things) {
      setQuantity(quantity + 1);
    }
  };
  const amount = calculateTotal();
  const formattedAmount = `${amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
  const extractNumericValue = (str) => {
    const numericValue = parseInt(str.replace(/\D/g, ""));
    return numericValue.toLocaleString();
  };
  const handleExtractedValue = (numericValue) => {
    console.log("Extracted numeric value:", numericValue);
  };
  const handleInfoClick = (info) => {
    setInfoAndComments(info);
  };

  const addToBacket = (item) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemExists = cartItems.some(
      (cartItem) => cartItem.description === item.description
    );
    if (!itemExists) {
      cartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };
  return (
    <Box>
      <Box>
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "500",
            paddingTop: "5px",
            paddingBottom: "15px",
            userSelect: "none",
            paddingLeft: "2vw",
          }}
        >{`Bosh sahifa / Barcha turkumlar / ${productInfo.catigoris} / ${productInfo.description}`}</p>
      </Box>
      <Box
        className="openproductdisplay"
        sx={{
          justifyContent: "space-between",
          padding: "0 2%",
        }}
      >
        <Box className='democorusel'>
        <DemoCarousel productInfo={productInfo.img} />
        </Box>
        <Box className="infocountBox" key={productInfo.id}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                color="#F5A623"
                aria-hidden="true"
                viewBox="0 0 30 30"
                data-testid="StarIcon"
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
              {`${productInfo.stars.star}  (${productInfo.stars.countstarts} baho)`}
            </Box>
            <p>{`${Math.floor(Math.random() * 40)} ta buyurtma`}</p>
          </p>
          <h2
            style={{
              width: "70%",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "140%",
              fontWeight: "400",
            }}
          >
            {productInfo.description}
          </h2>
          <Box
            sx={{
              display: "flex",
              gap: "2vw",
              fontSize: "20px",
              fontFamily: "Inter",
            }}
          >
            <p style={{ color: "rgb(30, 29, 29)" }}>Sotuvchi : </p>
            <Link
              to={""}
              style={{
                color: "rgb(30, 29, 29)",
              }}
            >
              <p>{productInfo.vendor}</p>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "2vw",
              fontSize: "19px",
              fontFamily: "Inter",
              alignItems: "center",
            }}
          >
            <p>Yetkazib berish:</p>
            <p
              style={{
                position: "relative",
                top: "-3px",
              }}
            >
              1 kun, bepul{" "}
              <Tooltip
                title={
                  <Box
                    sx={{
                      padding: "15px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        lineHeight: "18px",
                      }}
                    >
                      Mahsulot buyurtirilgan kunning ertasiga mahsulotni rasmiy
                      topshirish punktlarimizga yetkazamiz. Rasmiylashtirish
                      bosqichida sizga eng qulay manzilni tanlang.
                    </span>
                  </Box>
                }
                placement="right"
              >
                <button
                  style={{
                    position: "relative",
                    right: "-5px",
                    top: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <InfoIcon
                    sx={{
                      color: "#DADADD",
                    }}
                  />
                </button>
              </Tooltip>
            </p>
          </Box>
          <Box
            sx={{
              paddingTop: "2%",
            }}
          >
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                fontWeight: "400",
              }}
            >
              Miqdor :
            </p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1vw",
                  alignItems: "center",
                  border: ".5px solid #cccc",
                  width: "140px",
                  borderRadius: "7px",
                  height: "53px",
                  padding: "0px 10px",
                }}
              >
                <button className="Counter" onClick={handleDecrease}>
                  <RemoveIcon sx={{ width: "25px" }} />
                </button>
                <h2
                  style={{
                    fontSize: "18px",
                    fontFamily: "Inter",
                  }}
                >
                  {quantity}
                </h2>
                <button className="Counter" onClick={handleIncrease}>
                  <AddIcon sx={{ width: "25px" }} />
                </button>
              </Box>
              <Box>
                {productInfo.things <= 1 ? (
                  <p
                    style={{
                      color: "#7000FF",
                      fontSize: "17px",
                      fontFamily: "Inter",
                      display: "flex",
                      alignItems: "center",
                      gap: ".2vw",
                    }}
                  >
                    <img
                      src="data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.5049 1.86715V0.99585L10.7526 1.43546L11.0049 1.86715C10.7526 1.43546 10.7524 1.43557 10.7522 1.43569L10.7517 1.43599L10.7504 1.43677L10.7465 1.43905L10.734 1.44655C10.7235 1.45285 10.7089 1.46176 10.6904 1.47327C10.6533 1.49628 10.6007 1.52971 10.5348 1.57349C10.4029 1.66103 10.2173 1.79021 9.99599 1.96061C9.55393 2.30092 8.9655 2.80844 8.37646 3.48037C7.32037 4.68505 6.24614 6.43815 6.03663 8.7112C5.97334 8.62082 5.91227 8.5088 5.85405 8.37345C5.76832 8.17417 5.71024 7.9695 5.67356 7.81119C5.65545 7.73302 5.64309 7.6685 5.63542 7.62465C5.63159 7.60278 5.62895 7.5862 5.62737 7.57581L5.62578 7.56504L5.62567 7.56431L5.62564 7.56404L5.62561 7.56382L5.62556 7.56351L5.62555 7.56337L5.48535 6.50496L4.76198 7.2915L5.13 7.62996C4.76198 7.2915 4.76185 7.29164 4.76171 7.29178L4.76141 7.29211L4.7607 7.29289L4.75884 7.29494L4.75336 7.301L4.73569 7.32094C4.72102 7.33767 4.70071 7.36125 4.67557 7.39148C4.62531 7.4519 4.5556 7.539 4.47299 7.65095C4.30796 7.87459 4.09025 8.19907 3.873 8.60986C3.43952 9.42955 3 10.6083 3 12.0221C3 15.8743 6.13919 19.0009 10 19.0009C13.8608 19.0009 17 15.8743 17 12.0221C17 9.18756 15.4792 7.67893 14.0971 6.36405L14.012 6.2832C12.6533 4.99143 11.5049 3.89964 11.5049 1.86715ZM9.12842 4.13958C9.65177 3.54259 10.1757 3.08691 10.5746 2.77724C10.8776 4.68829 12.1154 5.86244 13.2585 6.94682L13.4078 7.08856C14.7732 8.38755 16 9.63833 16 12.0221C16 15.3189 13.3116 18.0009 10 18.0009C6.68839 18.0009 4 15.3189 4 12.0221C4 10.8161 4.37548 9.79878 4.757 9.07735C4.81633 8.96516 4.87561 8.8605 4.93337 8.76381L4.93544 8.76861C5.14841 9.26369 5.61069 10.0121 6.5 10.0121H7V9.51209C7 7.16515 8.05294 5.36638 9.12842 4.13958ZM8.45317 11.3496C7.86179 11.9734 7.25 12.6187 7.25 13.7812C7.25 15.2812 8.48276 16.5 10 16.5C11.5172 16.5 12.75 15.2812 12.75 13.7812C12.75 12.6562 12.0625 11.9687 12.0625 11.9687C12.0625 11.9687 11.8491 12.6484 11.375 12.6484C11.375 10.3984 9.54167 9.24996 9.54167 9.24996C9.54167 10.2015 9.00635 10.7661 8.45317 11.3496Z' fill='%237000FF'/%3e %3c/svg%3e"
                      alt="png"
                    />
                    Oxirgisi qoldi!
                  </p>
                ) : (
                  <p
                    style={{
                      color: "#00C853",
                      fontSize: "17px",
                      fontFamily: "Inter",
                    }}
                  >{`Sotuvda ${productInfo.things} dona bor`}</p>
                )}
              </Box>
            </Box>
            <Box>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  paddingTop: "10px",
                }}
              >
                Narx :
              </p>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.5vw",
                  position: "relative",
                  top: "-20px",
                }}
              >
                <p
                  style={{
                    color: "#212121",
                    fontSize: "23px",
                    fontWeight: "500",
                    lineHeight: " 28px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {formattedAmount}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#8a8d93",
                    position: "relative",
                    top: "3px",
                    textDecorationLine: "line-through",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  <del>{`${productInfo.previousprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`}</del>
                </p>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                padding: "1% 2%",
                borderRadius: "13px",
                background: "#F5F6FA",
                ":hover": { background: "#edeff2" },
                userSelect: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: "500",
                  gap: "5px",
                }}
              >
                <mark
                  style={{
                    padding: " 7px 6px",
                    borderRadius: "6px",
                  }}
                >{`Oyiga ${extractNumericValue(
                  productInfo.installmentplan,
                  handleExtractedValue
                )} so'mdan`}</mark>
                <p>muddatli to'lov</p>
              </Box>
              <ChevronRightIcon
                sx={{
                  color: "#A9ABB0",
                  fontSize: "30px",
                }}
              />
            </Box>
            <Box className='BtnsProductOpen'
              sx={{
             
                alignItems: "center",
                marginTop: "3.5vh",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{
                  width: "49%",
                  padding: "5px 0",
                  borderRadius: "13px",
                  color: "#fff",
                  background: "#7000ff",
                  ":hover": {
                    background: "#5d00d6",
                  },
                  ":active": {
                    background: "#420099",
                  },
                  fontFamily: "Inter",
                }}
                onClick={() => addToBacket(productInfo)}
              >
                <p className="btnPayProduct">
                Savatchaga qo'shish
                </p>
              </Button>
              <Button 
                sx={{
                  width: "49%",
                  padding: "5px 0",
                  boxShadow: "inset 0 0 0 1.5px #7000ff",
                  border: "none",
                  borderRadius: "13px",
                  color: "#7000ff",
                  ":hover": {
                    background: "#EFEFEF",
                  },
                  fontFamily: "Inter",
                }}
              >
                <p className="btnPayProduct">
                Tugmani 1 bosishda xarid qilish
                </p>
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "2.5vh",
                padding: "3px 32px",
                borderRadius: "13px",
                background: "#FFF7C1",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 4.5C12.2402 4.5 11 5.88779 11 7.5H17C17 5.88779 15.7598 4.5 14 4.5ZM9.5 11.5V9H7.5V14.25C7.5 14.6642 7.16421 15 6.75 15C6.33578 15 6 14.6642 6 14.25V8.25V7.5H6.75H9.5C9.5 5.11221 11.3598 3 14 3C16.6402 3 18.5 5.11221 18.5 7.5H21.25H22V8.25V21.75C22 22.9926 20.9926 24 19.75 24H15.25C14.8358 24 14.5 23.6642 14.5 23.25C14.5 22.8358 14.8358 22.5 15.25 22.5H19.75C20.1642 22.5 20.5 22.1642 20.5 21.75V9H18.5V11.5H17V9H11V11.5H9.5ZM14.2738 18.0323C14.5667 17.7395 14.5667 17.2646 14.2738 16.9717C13.9809 16.6788 13.506 16.6788 13.2131 16.9717L7.99548 22.1893L5.78034 19.9742C5.48744 19.6813 5.01257 19.6813 4.71967 19.9741C4.42678 20.267 4.42677 20.7419 4.71966 21.0348L7.46513 23.7803C7.60579 23.921 7.79655 24 7.99547 24C8.19438 24 8.38515 23.921 8.5258 23.7803L14.2738 18.0323Z"
                  fill="#141415"
                ></path>
              </svg>
              <p
                style={{
                  fontSize: "15px",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Bu haftada 1046 kishi sotib oldi
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            borderTop: "1px solid #E0E0E0",
            borderBottom: "1px solid #E0E0E0",
            height: "70px",
            marginTop: "4vh",
            display: "flex",
            alignItems: "center",
          }}
          className="InfoAndCommentsContent"
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
              margin: "auto",
              display: "flex",
              gap: "3vw",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <h3
              className={infoandcomments === "Info" ? "selected" : ""}
              onClick={() => {
                setInfoAndComments("Info");
                handleInfoClick("Info");
              }}
            >
              Mahsulot tavsifi
            </h3>
            <h3
              className={infoandcomments === "Comments" ? "selected" : ""}
              onClick={() => {
                setInfoAndComments("Comments");
                handleInfoClick("Comments");
              }}
            >
              Sharhlar {`(${Math.floor(Math.random() * 120)})`}
            </h3>
          </Box>
        </Box>
        <Box className={`Info ${infoandcomments !== "Info" ? "hidden" : ""}`}>
          <p
            style={{
              fontSize: "18px",
              fontFamily: "Roboto",
              padding: "30px 0px",
              width: "60%",
              lineHeight: "25px",
              margin: "auto",
            }}
          >
            {productInfo.info}
          </p>
          <br />
          <br />
          <CoruselOpenProduct
            setProductInfo={setProductInfo}
            productInfo={productInfo}
          />
        </Box>
        <Box
          className={`Comments ${
            infoandcomments !== "Comments" ? "hidden" : ""
          }`}
          sx={{
            width: "60%",
            margin: "auto",
          }}
        >
          {" "}
          <br />
          comments
        </Box>
      </Box>
    </Box>
  );
}
