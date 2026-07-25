import React from 'react'
import './Services.css'
import s1 from '../../assets/services1.jpg'
import s2 from '../../assets/services2.jpg'
import s3 from '../../assets/services3.jpg'

const Services = () => {
  return (
    <div className='Services'>
    <div className="services-content">
    <span className="services-badge">our services</span>
    <h1 className="services-title">
        <span className="line1">Expert Hair Styling &</span>
        <span className="line2">Transformations in Upington</span>
    </h1>
    <p className="services-subtitle">From fresh precision cuts and vibrant custom coloring to restorative hair treatments,
    our professional stylists are dedicated to bringing your vision to life. Step into 
    our salon for a personalized experience that leaves your hair healthy, radiant, and perfectly styled</p>

  <section class="services-container">
  
  <div class="service-row">
    <div class="services-left">
    <img src={s1} alt="sleek straight blowout hairstyle glossy shine"/>
    </div>
    <div class="services-right">
      <h3>Sleek Straight Blowout</h3>
      <p>A smooth, frizz free style with a mirror like shine, achieved through blow drying and flat ironing. 
      Timeless and versatile for any hair length.</p>
      <hr/>
      <a href="#" class="book-btn">Book Now</a>
    </div>
  </div>

  <div class="service-row">
    <div class="services-left">
    <img src={s2} alt="Soft Beach Waves"/>
    </div>
    <div class="services-right">
      <h3>Soft Beach Waves</h3>
      <p>Relaxed, tousled waves that give a natural, effortless look. Popular for its low-maintenance, romantic vibe.</p>
      <hr/>
      <a href="#" class="book-btn">Book Now</a>
    </div>
  </div>

  <div class="service-row">
    <div class="services-left">
    <img src={s3} alt="Box Braids"/>
    </div>
    <div class="services-right">
      <h3>Box Braids</h3>
      <p>Box braids are individual plaits created by sectioning the hair into equal-sized, box-shaped parts. 
      They typically begin with a knot at the root, where braiding hair extensions are added for extra length and 
      volume.</p>
      <hr/>
      <a href="#" class="book-btn">Book Now</a>
    </div>
  </div>
  </section>
    </div>
      
    </div>
  )
}

export default Services
