import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MainPage from '../MainPage/MainPage';
import OpenProduct from '../Products/OpenProduct/OpenProduct';
import Favorite from '../Favorite/Favorite';
import Basket from '../Basket/Basket';
import { Box } from '@mui/material';
export default function Router({setProductInfo, productInfo}) {

  return (
    <Box>
      <Routes>
      <Route path='/' element={<MainPage setProductInfo={setProductInfo} />} />
      <Route path={`product/${productInfo.catigoris}/${productInfo.description}/${productInfo.id}`} element={<OpenProduct productInfo={productInfo} setProductInfo={setProductInfo} />}/>
      <Route path='saralanganlar' element={<Favorite setProductInfo={setProductInfo}/>} />
      <Route path='cart' element={<Basket/>}/>
      </Routes> 
    </Box>
  );
}

