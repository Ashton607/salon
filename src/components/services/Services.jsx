import React, { useState } from 'react'
import './Services.css'
import s1 from '../../assets/services1.jpg'
import s2 from '../../assets/services2.jpg'
import s3 from '../../assets/services3.jpg'
import s4 from '../../assets/services4.png'
import s5 from '../../assets/services5.png'
import s6 from '../../assets/services6.png'

const Services = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='Services'>
      <div className="services-content">
        <span className="services-badge">our services</span>
        <h1 className="services-title">
          <span className="line1">Professional Hair Styling</span>
          <span className="line2">& Nail Care in Upington</span>
        </h1>
        <p className="services-subtitle">From modern haircuts and custom hair coloring to long-lasting gel nails and luxury 
          pedicures, our expert team is dedicated to bringing out your best look. Explore our 
          full range of beauty treatments designed to nourish your hair and pamper your nails.</p>

        <section className="services-container">

          {/* Always visible - first 3 */}
          <div className="service-row">
            <div className="services-left">
              <img src={s1} alt="sleek straight blowout hairstyle glossy shine"/>
            </div>
            <div className="services-right">
              <h3>Sleek Straight Blowout</h3>
              <p>A smooth, frizz free style with a mirror like shine, achieved through blow drying and flat ironing.
              Timeless and versatile for any hair length.</p>
              <p>35 min</p>
              <p>R 250</p>
              <a href="#" className="book-btn">Book Now</a>
            </div>
          </div>

          <div className="service-row">
            <div className="services-left">
              <img src={s2} alt="Soft Beach Waves"/>
            </div>
            <div className="services-right">
              <h3>Soft Beach Waves</h3>
              <p>Relaxed, tousled waves that give a natural, effortless look. Popular for its low-maintenance, romantic vibe.</p>
              <p>45 min</p>
              <p>R 200</p>
              <a href="#" className="book-btn">Book Now</a>
            </div>
          </div>

          <div className="service-row">
            <div className="services-left">
              <img src={s3} alt="Box Braids"/>
            </div>
            <div className="services-right">
              <h3>Box Braids</h3>
              <p>Box braids are individual plaits created by sectioning the hair into equal-sized, box-shaped parts.
              They typically begin with a knot at the root, where braiding hair extensions are added for extra length and
              volume.</p>
              <p>1 hr 30 min</p>
              <p>R 350</p>
              <a href="#" className="book-btn">Book Now</a>
            </div>
          </div>

          {/* Hidden until expanded */}
          {showMore && (
            <>
              <div className="service-row">
                <div className="services-left">
                  <img src={s4} alt="Classic Manicure"/>
                </div>
                <div className="services-right">
                  <h3>Classic Manicure</h3>
                  <p>A complete nail treatment including shaping, cuticle care, hand massage, and polish application. Leaves nails neat, healthy, and beautifully finished.</p>
                  <p>50 min</p>
                  <p>From  R150</p>
                  <a href="#" className="book-btn">Book Now</a>
                </div>
              </div>

              <div className="service-row">
                <div className="services-left">
                  <img src={s5} alt="classic pedicure spa nail salon"/>
                </div>
                <div className="services-right">
                  <h3>Classic Pedicure</h3>
                  <p>A relaxing foot treatment including nail shaping, cuticle care, callus removal, foot massage, and polish application. Leaves feet soft, refreshed, and perfectly groomed.</p>
                  <p>25 min</p>
                  <p>From  R180</p>
                  <a href="#" className="book-btn">Book Now</a>
                </div>
              </div>

              <div className="service-row">
                <div className="services-left">
                  <img src={s6} alt="nail art design salon manicure"/>
                </div>
                <div className="services-right">
                  <h3>Nail Polish & Art</h3>
                  <p>Custom hand-painted or embellished designs added to your manicure or pedicure, from subtle accents to intricate patterns. A creative way to personalize your look.</p>
                  <p>40 min</p>
                  <p>From  R100</p>
                  <a href="#" className="book-btn">Book Now</a>
                </div>
              </div>
            </>
          )}

        </section>

        <button className="expand-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>

      </div>
    </div>
    
  )
}

export default Services