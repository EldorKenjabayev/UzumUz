import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './DemoCorusel.css'

const DemoCarousel  = ({productInfo}) => {
    const images = productInfo.map((url) => ({
        original: url,
        thumbnail: url 
      }));
  return <ImageGallery items={images} thumbnailPosition={'left'} originalWidth={"100px"} thumbnailHeight={'400px'}/>;
};

export default DemoCarousel ;
