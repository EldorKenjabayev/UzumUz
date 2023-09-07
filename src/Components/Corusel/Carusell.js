import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./corusel.css";

const Carusel = () => {
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 40,
    height: 40,
    cursor: "pointer",
    color: "#fff",
  };

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      showStatus={false}
      interval={2500}
      className="Corusel"
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <ArrowBackIosIcon
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              ...arrowStyles,
              left: "15px",
              width: "50px",
              height: "50px",
              fontWeight: "200",
              backgroundColor: "#cccccc58",
              borderRadius: "50%",
              padding: "10px 10px 10px 15px",
              color: "#000",
            }}
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <ArrowForwardIosIcon
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              ...arrowStyles,
              right: "15px",
              width: "50px",
              height: "50px",
              fontWeight: "200",
              backgroundColor: "#cccccc58",
              borderRadius: "50%",
              padding: "10px 10px 15px 10px",
              color: "#000",
            }}
          />
        )
      }
    >
      <div className="divslide">
        <img
          src="https://images.uzum.uz/cihpr4t6sfhndlbpkpu0/main_page_banner.jpg"
          alt="Slide 1"
        />
      </div>
      <div className="divslide">
        <img
          src="https://images.uzum.uz/cihq3sl40v9pplt56ubg/main_page_banner.jpg"
          alt="Slide 2"
        />
      </div>
      <div className="divslide">
        <img
          src="https://images.uzum.uz/cihq2b5enntd8rfcr71g/main_page_banner.jpg"
          alt="Slide 3"
        />
      </div>
      <div className="divslide">
        <img
          src="https://images.uzum.uz/cihq7djltlh4bk4n25j0/main_page_banner.jpg"
          alt="Slide 4"
        />
      </div>
      <div className="divslide">
        <img
          src="https://images.uzum.uz/ciolsut40v9pplt5uer0/main_page_banner.jpg"
          alt="Slide 5"
        />
      </div>
    </Carousel>
  );
};

export default Carusel;
