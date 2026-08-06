import React, { useState } from 'react'
import './Services.css'
import s1 from '../../assets/services1.jpg'
import s2 from '../../assets/services2.jpg'
import s3 from '../../assets/services3.jpg'
import s4 from '../../assets/services4.jpg'
import s5 from '../../assets/services5.jpg'
import s6 from '../../assets/services6.jpg'
import s7 from '../../assets/services7.jpg'
import s8 from '../../assets/services4.png'
import s9 from '../../assets/services9.jpg'
import s10 from '../../assets/services10.jpg'
import s11 from '../../assets/services9.jpg'
import s12 from '../../assets/services9.jpg'
import s13 from '../../assets/services5.png'
import s14 from '../../assets/services6.png'
import s15 from '../../assets/services15.jpg'
import s16 from '../../assets/services16.jpg'
import s17 from '../../assets/services17.jpg'
import { IoIosArrowDown,IoIosArrowForward } from 'react-icons/io'
import {Link} from 'react-scroll'

const Services = () => {
const [showMore, setShowMore] = useState(false)


  return (
    <div className='Services' id='services'>
      <div className="services-content">
        <span className="services-badge">our services</span>
        <h1 className="services-title">
          <span className="line1">Haircare/Makeup/Nail</span>
          <span className="line2">& Skin Care in Kimberley</span>
        </h1>
        <p className="services-subtitle">
        From personalized haircare and flawless makeup application to long-lasting gel nails 
        and rejuvenating skincare, I am dedicated to bringing out your absolute best look. 
        Explore my full range of tailored beauty treatments right here in Kimberley, designed 
        to help you feel confident, radiant, and fully pampered.</p>

 <section className="services-container">

  {/* Row 1 - Haircare (always visible) */}
  <div className="category-badge">haircare</div>
  <hr className="service-divider" />
  <div className="service-grid-row">
    <div className="service-tile">
      <img src={s1} alt="sleek straight blowout hairstyle glossy shine"/>
      <div className="tile-overlay">
        <h3>Sleek Straight Blowout</h3>
        <p className="tile-meta">35 min · R 250</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s2} alt="Clip in Extensions"/>
      <div className="tile-overlay">
        <h3>Clip in Extensions</h3>
        <p className="tile-meta">45 min · R 200</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s3} alt="Box Braids"/>
      <div className="tile-overlay">
        <h3>Box Braids</h3>
        <p className="tile-meta">1 hr 30 min · R 350</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

  </div>

  {/* Row 2 - Nails (hidden until expanded) */}
  {showMore && (
    <>
   <div className="category-badge"></div>
   <div className="service-grid-row">
    <div className="service-tile">
      <img src={s4} alt="Platinum blonde dye"/>
      <div className="tile-overlay">
        <h3>Platinum Blonde Dye</h3>
        <p className="tile-meta">2 hr · R 500</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s5} alt="Wave Treatment"/>
      <div className="tile-overlay">
        <h3>Wave Treatment</h3>
        <p className="tile-meta">1 hr · R 300</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s6} alt="Women short hair cut"/>
      <div className="tile-overlay">
        <h3>Women Short Hair Cut</h3>
        <p className="tile-meta">30 min · R 150</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>
  </div>

<div className="category-badge">MakeUp</div>
<hr className="service-divider" />
   <div className="service-grid-row">
    <div className="service-tile">
      <img src={s7} alt="Natural Full Face Makeup"/>
      <div className="tile-overlay">
        <h3>Full Face Makeup</h3>
        <p className="tile-meta">2 hr · R 500</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s9} alt="Eye Shadows Makeup"/>
      <div className="tile-overlay">
        <h3>Eye Shadows</h3>
        <p className="tile-meta">1 hr · R 300</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>

    <div className="service-tile">
      <img src={s10} alt="Mascara Makeup"/>
      <div className="tile-overlay">
        <h3>Mascara</h3>
        <p className="tile-meta">1 hr · R 300</p>
        <span className="book-btn">
          <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
        </span>
      </div>
    </div>
  </div>


      <div className="category-badge">nails</div>
      <hr className="service-divider" />
      <div className="service-grid-row">
        <div className="service-tile">
          <img src={s8} alt="Classic Manicure"/>
          <div className="tile-overlay">
            <h3>Classic Manicure</h3>
            <p className="tile-meta">50 min · From R150</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>

        <div className="service-tile">
          <img src={s13} alt="classic pedicure spa nail salon"/>
          <div className="tile-overlay">
            <h3>Classic Pedicure</h3>
            <p className="tile-meta">25 min · From R180</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>

        <div className="service-tile">
          <img src={s14} alt="nail art design salon manicure"/>
          <div className="tile-overlay">
            <h3>Nail Polish & Art</h3>
            <p className="tile-meta">40 min · From R100</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>
      </div>


      <div className="category-badge">skin</div>
      <hr className="service-divider" />
      <div className="service-grid-row">
        <div className="service-tile">
          <img src={s15} alt="Hydrating Facials skincare"/>
          <div className="tile-overlay">
            <h3>Hydrating Facials</h3>
            <p className="tile-meta">50 min · From R150</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>

        <div className="service-tile">
          <img src={s16} alt="Deep cleansing skincare"/>
          <div className="tile-overlay">
            <h3>Deep Cleansing</h3>
            <p className="tile-meta">45 min · From R120</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>

        <div className="service-tile">
          <img src={s17} alt="face mask skincare"/>
          <div className="tile-overlay">
            <h3>Face Mask</h3>
            <p className="tile-meta">30 min · From R80</p>
            <span className="book-btn">
              <Link to="booking" smooth={true} offset={-70} duration={500}>Book Now <IoIosArrowForward style={{ marginBottom: '-3px' }} /></Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )}

</section>

        <button className="expand-btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show Less' : 'Show More'}
        <IoIosArrowDown className={`expand-icon ${showMore ? 'rotated' : ''}`} />
        </button>

      </div>
      <div className="services-wave">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,40 C480,120 960,0 1440,60 L1440,120 L0,120 Z" fill="#2B1F1A"></path>
    </svg>
    </div>
    </div>
    
  )
}

export default Services