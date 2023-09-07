import { Box, Button, Typography } from "@mui/material";
import React from "react";
export default function Top() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "32px",
        bgcolor: "#F4F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 120,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "80%",
          },
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "18px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            },
          }}
        >
          <Box
            sx={{
              width: "140px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>
              <i className="bx bx-map"></i>
            </Typography>
            <Typography>Shahar:</Typography>
            <Typography sx={{ textDecoration: "underline", fontWeight: "600" }}>
              Urganch
            </Typography>
          </Box>

          <Box
            sx={{
              width: "140px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Topshirish punkti</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "440px",
            height: "100%",
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "flex",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            Buyurtmangizni 1 kunda bepul yetkazib beramiz!
          </Typography>
        </Box>
        <Box
          sx={{
            width: "30%",
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            },
          }}
        >
        
          <Box
            sx={{
              width: "120px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>Savol-javoblar</Typography>
          </Box>
          <Box
            sx={{
              width: "120px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>Buyurtmalarim</Typography>
          </Box>
          <Button sx={{ display: "flex", gap: "10px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/8603/8603691.png"
              style={{
                width: "30px",
              }}
              alt="#"
            />
            <Typography sx={{ fontSize: "14px", textTransform: "capitalize" }}>
              O'zbekcha
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
