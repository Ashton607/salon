import React from 'react'
import './Testimonials.css'


const testimonials = [
  {
    quote: "I'm amazed by the results! The laser hair removal treatment was painless and effective. Highly recommend!",
    name: 'Samantha K.',
    bg: '#332019'
  },
  {
    quote: "After struggling with unwanted hair for years, I finally found a solution at this clinic. The staff is professional and caring.",
    name: 'Michael R.',
    bg: '#6B5A4E'
  },
  {
    quote: "The skin rejuvenation treatment transformed my complexion. I feel more confident and radiant than ever.",
    name: 'Emily L.',
    bg: '#aa8267'
  }
]

const Testimonials = () => {
  return (
    <div className='Testimonials'>
    <div className="testimonials-content">
    <span className="testimonials-badge">customer reviews</span>
    <h1 className="testimonials-title">
        <span className="line1">What Our Clients Say.</span>
        <span className="line2">Happy Salon Clients.</span>
    </h1>
    <p className="testimonials-subtitle">Read real reviews from our valued clients in Upington Northern Cape. 
        From dramatic hair transformations and vibrant coloring to stunning nail art and long lasting 
        manicures, see why locals trust us for all their beauty needs.</p>
    
    <div className="testimonial-cards">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" style={{ backgroundColor: item.bg }} key={index}>
            <p className="testimonial-quote">"{item.quote}"</p>
            <p className="testimonial-name">{item.name}</p>
          </div>
        ))}
    </div>
    </div>
    </div>
  )
}

export default Testimonials
