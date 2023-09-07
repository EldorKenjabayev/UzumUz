import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Top from "./Components/Top/Top";
import Router from "./Components/Router/Router";
import Navigation from "./Components/Navigation/Navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Footer from "./Components/Footer/Footer";
import './App.css'
import FooterSmall from "./Components/Footer/FooterSmall";
export default function App() {
  const [ProfileUser, setProfileUser] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [sliderVisible, setSliderVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setSliderVisible(true);
      } else {
        setSliderVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleProductInfo = (item) => {
    setProductInfo(item);
  };
  return (
    <Box className="Conteiner" >
      <Top />
      <Box sx={{ maxWidth: "1800px", margin: "auto", padding: "0 2%" }}>
        <Navigation ProfileUser={ProfileUser} setProfileUser={setProfileUser} />
        <Router
          setProductInfo={handleProductInfo}
          productInfo={productInfo}
        />
        <Box
          className="ArrowBackIosNewIcon"
          sx={{
            width: "60px",
            height: "60px",
            background: "#7000FF",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            cursor: "pointer",
            position: "fixed",
            bottom: "10%",
            right: "5%",
            zIndex: 10000,
            opacity: sliderVisible ? 1 : 0,
            transform: `translateY(${sliderVisible ? 0 : "20px"})`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setSliderVisible(true);
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              transform: "rotate(90deg)",
              fontSize: "40px",
              cursor: "pointer",
            }}
          />
        </Box> <br /><br />
        <Box>
          <Box className='footer'>
            <Footer/>
          </Box>
          <Box className='footerSmall'>
            <FooterSmall />
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
}
