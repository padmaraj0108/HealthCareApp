import React from 'react'
import image2 from "../../../src/assets/images/image2.jpg"
import image1 from "../../../src/assets/images/image1.jpg"
const About = () => {
    return (
        <div>
          <center>
          <p>
                <h4>
                    <h1> <b><u>About Us</u></b></h1>
                    <br/><br/><br/><br/>
We develop and deliver user friendly apps and for greater living of  peoples specially aged care and sport. We work with a wide range of stakeholders to ensure better health for all.

</h4>
<br/><br/><br/>


            </p>
       </center> 
       
       <h2 style={{marginLeft:500}}><b>HEALTH CARE APP</b></h2>
<div style={{marginLeft:500}}><img src={image2}></img>
<img src={image1} style={{height:175}}></img>
</div>

</div>
    )
}

export default About
