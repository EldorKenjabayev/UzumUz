import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import Catalog from "./Catalog";
import "./LeftDraver.css";

export default function LeftDrawer() {
  var buttons = [
    {
      id: 1,
      name: "Buyurtmalarim",
      icons: "fa-solid fa-bag-shopping",
    },
    {
      id: 2,
      name: "Saralangan",
      icons: "fa-solid fa-heart",
    },
    {
      id: 3,
      name: "Shahar: Urganch",
      icons: "fa-solid fa-location-dot",
    },
    {
      id: 4,
      name: "Topshirish punkti",
      icons: "fa-solid fa-map",
    },
  ];
  var accord = [
    {
      id: 1,
      name: "Biz haqimizda",
      small: [
        {
          id: 1,
          name: "Topshirish punktlari",
          link: "/ru/about/delivery-points",
        },
        {
          id: 2,
          name: "Vakansiyalar",
          link: "/ru/about/careers",
        },
      ],
    },
    {
      id: 2,
      name: "Hamkorlarga",
      small: [
        {
          id: 1,
          name: "Uzumda soting",
          link: "https://seller.uzum.uz/",
        },
        {
          id: 2,
          name: "Sotuvchi Kabinetiga kirish",
          link: "https://seller.uzum.uz/seller/signin",
        },
      ],
    },
  ];
  var [theme, settheme] = useState([]);
  var [catalogy, setCatalogy] = useState([]);
  var [expanded, setExpanded] = useState([]);
  var [filtered, setFiltered] = useState([]);
 
  var handleChange = (index) => {
    filtered = catalogy.filter((item) => item.id === catalogy[index].compare);
    setFiltered(filtered);
    expanded = theme.filter((item) => item.compare === filtered[0].compare);
    setExpanded(expanded);
    settheme('');
    setCatalogy('');
  };
  return (
    <>
      {/* //kategori */}
      <Box sx={{ width: "100%", height: "auto", backgroundColor: "#f4f5f5" }}>
        <Accordion>
          <AccordionSummary
            id={"panel-header"}
            aria-controls="panel1-content"
            expandIcon={<ExpandMore />}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "blue",
              }}
            >
              <i className="bx bx-collection"></i>
              <Typography>Katalog</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0px",
            }}
          >
            <Catalog />

            {catalogy.length !== 0
              ? catalogy.map((item, index) => (
                  <Accordion onChange={() => handleChange(index)}>
                    <AccordionSummary
                      id={"panel-header"}
                      aria-controls="panel1-content"
                      expandIcon={<ExpandMore />}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <i className={item.icons}></i>
                        <Typography>{item.name}</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {expanded.length !== 0
                        ? expanded.map((item, index) => (
                            <Accordion key={index}>
                              <AccordionSummary
                                id={"panel-header"}
                                aria-controls="panel1-content"
                                expandIcon={<ExpandMore />}
                              >
                                <Typography>{item.name}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {expanded[index].other.map((item, index) => (
                                  <Link
                                    to={"product"}
                                    style={{
                                      textDecoration: "none",
                                      color: "transparent",
                                    }}
                                  >
                                    <Typography
                                      key={index}
                                      sx={{
                                        fontSize: "12px",
                                        padding: "2px 0 2px 0",
                                        color: "#000",
                                        ":hover": {
                                          color: "blue",
                                        },
                                      }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </Link>
                                ))}
                              </AccordionDetails>
                            </Accordion>
                          ))
                        : ""}
                    </AccordionDetails>
                  </Accordion>
                ))
              : ""}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "98%",
            height: "450px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "45%",
              borderBottom: "1px solid",
              display: "flex",
              alignItems: "start",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            {buttons.length !== 0
              ? buttons.map((item, index) => (
                  <Button key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#000",
                      }}
                    >
                      <i className={item.icons}></i>
                      <Typography sx={{ textTransform: "none" }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </Button>
                ))
              : ""}
          </Box>
          <Box sx={{ width: "100%", height: "auto" }}>
            {accord.length !== 0
              ? accord.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      id={"panel-header"}
                      aria-controls="panel1-content"
                      expandIcon={<ExpandMore />}
                    >
                      <Typography>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {accord[index].small.length !== 0
                          ? accord[index].small.map((item, index) => (
                              <Link key={index} to={item.link}>
                                <Button>
                                  <Typography>{item.name}</Typography>
                                </Button>
                              </Link>
                            ))
                          : ""}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              : ""}
          </Box>
        </Box>
      </Box>
    </>
  );
}
