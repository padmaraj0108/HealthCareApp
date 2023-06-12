import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import image3 from "../../../src/assets/images/image3.jpg"
import image2 from "../../../src/assets/images/image2.jpg"
import image1 from "../../../src/assets/images/image1.jpg"

const MainPage = () => {

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '1000px'
      }
      const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }

    const slideImages = [
        {
          url: image1,
          caption: 'Slide 1',
          height:'100%',
          width: '100%'
        },
        {
            url: image2,
          caption: 'Slide 2',
          height:10
        },
        {
            url: image3,
            caption: 'Slide 3',
            height:10
            
        },
      ];
    

    return (
        <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
        <h2 style={{marginLeft:80}}><b>Health Care App</b></h2>
      </div>

    );
};

export default MainPage
