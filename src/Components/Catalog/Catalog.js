import * as React from "react";
import HeadsetIcon from "@mui/icons-material/Headset";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./catalog.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Catalog() {
  const [view, setView] = React.useState("Elektronika");
  const handleChange = (event, nextView) => {
    setView(nextView);
    console.log(view);
  };

  return (
    <div className="Catalog" style={{
      zIndex:5000,
      display:"flex",
      width:"100%"
    }}>
      <ToggleButtonGroup
        orientation="vertical"
        value={null}
        exclusive
        onChange={handleChange}
        className="ToggleButtonGroup"
      >
        <ToggleButton
          value="Halol nasiya"
          aria-label="Halol nasiya"
          className="ToggleButton"
        >
          <li>
            <img
              src="https://static.uzum.uz/product-action/paiment.png"
              alt=""
              style={{
                width: "15%",
              }}
            />
            <p>Halol nasiya</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>               
        <ToggleButton
          value="Elektronika"
          aria-label="Elektronika"
          className="ToggleButton"
        >
          <li>
            <HeadsetIcon />
            <p>Elektronika</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
           
        <ToggleButton value="Kiyim" aria-label="Kiyim" className="ToggleButton" >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99963 3H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V3H16.0004C15.0882 4.21445 13.6358 5 12 5C10.3642 5 8.91184 4.21445 7.99963 3Z"
                fill="#1AB2FF"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.89431 4.55279L4.99989 3V9.25L4.39431 9.55279C3.90033 9.79978 3.29966 9.59955 3.05267 9.10557L1.4471 5.89443C1.20011 5.40045 1.40034 4.79978 1.89431 4.55279ZM22.1053 4.55279L18.9998 3V9.25L19.6053 9.55279C20.0993 9.79978 20.7 9.59955 20.947 9.10557L22.5525 5.89443C22.7995 5.40045 22.5993 4.79978 22.1053 4.55279Z"
                fill="#1AB2FF"
              ></path>
            </svg>
            <p>Kiyim</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Poyabzallar"
          aria-label="Poyabzallar"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00488 16.2129C2.3949 16.3047 2.79664 16.3939 3.50463 16.5171C4.92167 16.7635 6.89216 17.0097 9.10646 17.0097H21.6064C21.6064 17.5619 21.1587 18.0097 20.6064 18.0097H9.10646C6.82076 18.0097 4.79125 17.7558 3.33329 17.5023C2.60379 17.3754 2.41174 17.293 2.00488 17.1973V16.2129Z"
                fill="#FF1919"
              ></path>
              <path
                opacity="0.25"
                d="M3.33305 16.5024C4.79101 16.7559 6.82052 17.0098 9.10622 17.0098H21.6064V15.0098C15.362 15.0098 9.72082 16.5983 3.50439 15.5172C2.79639 15.394 2.21582 15.2598 2.21582 15.2598L2.00879 16.2168C2.41565 16.3125 2.60354 16.3755 3.33305 16.5024Z"
                fill="#FF1919"
              ></path>
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.21143 15.264C2.34012 14.784 2.60579 14.2594 3.10651 14.0091L3.10651 14.0099C3.10651 14.1765 3.50651 14.5099 5.10651 14.5099H8.36854C8.72227 14.5099 8.9636 14.1526 8.83223 13.8242L8.13284 12.0757C10.5602 11.1222 12.9662 10.0704 13.1065 9.50906C13.6065 7.50928 14.6065 6.50905 15.1065 6.00906C15.7649 5.35063 17.3464 6.55712 18.1965 7.20561L18.1965 7.20562L18.1965 7.20564C18.3671 7.33578 18.5082 7.44345 18.6065 7.50906C18.807 7.64287 19.1354 7.81662 19.4893 8.00383C20.2406 8.40125 21.1065 8.85934 21.1065 9.12486C21.1065 9.27507 21.1805 9.66244 21.2715 10.1392L21.2715 10.1392L21.2715 10.1393C21.4172 10.9021 21.6065 11.8939 21.6065 12.5093V15.0131C19.4405 15.0415 17.2863 15.2476 15.1366 15.4534H15.1366C11.2596 15.8244 7.3969 16.1941 3.50464 15.5172C2.99707 15.4289 2.56122 15.3407 2.21143 15.264ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
                fill="#FF1919"
              ></path>
              <path
                opacity="0.25"
                d="M5.10645 14.5097C3.50645 14.5097 3.10645 14.1764 3.10645 14.0097L8.13379 12.0796L8.83195 13.8239C8.96341 14.1523 8.72208 14.5097 8.3683 14.5097H5.10645Z"
                fill="#FF1919"
              ></path>
            </svg>
            <p>Poyabzallar</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Aksessuarlar"
          aria-label="Aksessuarlar"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 6C6.34315 6 5 7.34315 5 9V17C5 15.3431 6.34315 14 8 14H16C17.6569 14 19 15.3431 19 17V9C19 7.34315 17.6569 6 16 6H8Z"
                fill="#FF9500"
              ></path>
              <path
                opacity="0.5"
                d="M5 17C5 15.3431 6.34315 14 8 14H16C17.6569 14 19 15.3431 19 17V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V17Z"
                fill="#FF9500"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6H14C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6H8ZM5 11.1709C3.83481 11.5827 3 12.694 3 14.0002V18.0002C3 19.1048 3.89543 20.0002 5 20.0002H5.17071C5.06015 19.6874 5 19.3508 5 19.0002V11.1709ZM18.8293 20.0002H19C20.1046 20.0002 21 19.1048 21 18.0002V14.0002C21 12.694 20.1652 11.5827 19 11.1709V19.0002C19 19.3508 18.9398 19.6874 18.8293 20.0002ZM11 8C10.4477 8 10 8.44772 10 9V10C10 10.5523 10.4477 11 11 11H13C13.5523 11 14 10.5523 14 10V9C14 8.44772 13.5523 8 13 8H11Z"
                fill="#FF9500"
              ></path>
            </svg>
            <p>Aksessuarlar</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Maishiy texnika"
          aria-label="Maishiy texnika"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 18C5.89543 18 5 18.8954 5 20V22H19V20C19 18.8954 18.1046 18 17 18H7ZM12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21Z"
                fill="#6226D9"
              ></path>
              <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 3C3.89543 3 3 3.89543 3 5V10C3 11.1046 3.89543 12 5 12H7V17H17L19 3H7H5ZM7 5H5V10H7V5Z"
                fill="#6226D9"
              ></path>
            </svg>
            <p>Maishiy texnika</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Go'zallik"
          aria-label="Go'zallik"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.57651 4C6.27224 4 6.0385 4.26949 6.08154 4.57071L7.93868 17.5707C7.97387 17.817 8.18483 18 8.43365 18H15.5664C15.8152 18 16.0261 17.817 16.0613 17.5707L17.1429 10H6.85725L6.57153 8H17.4286L17.9185 4.57071C17.9615 4.26949 17.7278 4 17.4235 4H6.57651Z"
                fill="#FF3388"
              ></path>
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.85725 10L6.57153 8H17.4287L17.143 10H6.85725Z"
                fill="#FF3388"
              ></path>
              <path
                d="M9 18H15V20.5C15 21.3284 14.3284 22 13.5 22H10.5C9.67157 22 9 21.3284 9 20.5V18Z"
                fill="#FF3388"
              ></path>
            </svg>
            <p>Go'zallik</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Salomatlik"
          aria-label="Salomatlik"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.75"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21.4578C12.1915 21.4578 12.383 21.3921 12.5358 21.2605C12.9065 20.9414 13.369 20.5684 13.8889 20.149C16.9501 17.68 22 13.6069 22 9.5C22 6.3 19.45 4 16.5 4C13.65 4 12 6.33398 12 6.33398V21.4578Z"
                fill="#FF5319"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.33398C12 6.33398 10.3532 4 7.5 4C4.55 4 2 6.3 2 9.5C2 13.6073 7.05204 17.682 10.1127 20.1505C10.632 20.5693 11.094 20.9419 11.4642 21.2606C11.617 21.3921 11.8085 21.4578 12 21.4578V6.33398Z"
                fill="#FF5319"
              ></path>
            </svg>
            <p>Salomatlik</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="Uy-roʻzgʻor buyumlari"
          aria-label="Uy-roʻzgʻor buyumlari"
          className="ToggleButton"
        >
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.25"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 21H14.5C14.2239 21 14 20.7761 14 20.5V15.5C14 15.2239 13.7761 15 13.5 15H10.5C10.2239 15 10 15.2239 10 15.5V20.5C10 20.7761 9.77614 21 9.5 21Z"
                fill="#FF5319"
              ></path>
              <path
                opacity="0.75"
                d="M4 13L12 6L20 13V20.5C20 20.7761 19.7761 21 19.5 21H14.5C14.2239 21 14 20.7761 14 20.5V15.5C14 15.2239 13.7761 15 13.5 15H10.5C10.2239 15 10 15.2239 10 15.5V20.5C10 20.7761 9.77614 21 9.5 21H4.5C4.22386 21 4 20.7761 4 20.5V13Z"
                fill="#FF5319"
              ></path>
              <path
                d="M2.32678 11.377C2.14614 11.1686 2.16835 10.8533 2.37643 10.6723L11.6725 2.58535C11.8607 2.42165 12.1407 2.42166 12.3289 2.58538L21.6234 10.6723C21.8315 10.8533 21.8537 11.1686 21.6731 11.377L21.0276 12.1216C20.8467 12.3303 20.5307 12.3528 20.3221 12.1717L12.3284 5.23402C12.1404 5.07085 11.861 5.07084 11.673 5.23399L3.67771 12.1717C3.46907 12.3528 3.15314 12.3303 2.9722 12.1216L2.32678 11.377Z"
                fill="#FF5319"
              ></path>
            </svg>
            <p>Uy-roʻzgʻor buyumlari</p>
          </li>
          <ArrowForwardIosIcon
            sx={{
              fontWeight: "400",
              color: "#B2B3B8",
            }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
