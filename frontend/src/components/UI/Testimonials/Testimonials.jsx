import classes from './Testimonials.module.css'
import TestimonialCard from './TestimonialCard/TestimonialCard.jsx'
import Toggle from '../Toggle/Toggle.jsx'
import { useState } from 'react';

export default function Testimonials() {

  const [spin, setSpin] = useState(true);

  const handleToggle = () => {
    setSpin((spin) => !spin);
  }

  return (
    <section className={classes.container}>
      <div className={classes.textArea}>
        <h2 className={`${classes.title}`}>Testimonials</h2>
        <p className={`text ${classes.text}`}>Here's what people are saying</p>
        <Toggle className={classes.toggle} onToggle={handleToggle}/>
      </div>
      <div className={classes.testimonialsCarousele}>
        <div className={`${classes.group} ${!spin ? classes.paused : ''}`}>
          <TestimonialCard author={'Aya'}> “The Python Intermediate course helped me move beyond the basics — 
            I finally understand how to work with APIs, OOP, and real-world projects.”
          </TestimonialCard>
          <TestimonialCard author={'Sultan'}> “Perfect introduction to JavaScript! The lessons were short, 
            clear, and fun." 
          </TestimonialCard>
          <TestimonialCard author={'Bauyrzhan'}>
            “This advanced JS course pushed my skills to the next level. I learned about 
            async programming, ES6 features, and performance optimization.  " 
          </TestimonialCard>
          <TestimonialCard author={'Alexander'}>
            "I started this course with zero knowledge of databases, and now I can confidently write 
            SQL queries to manage real data."
          </TestimonialCard>
          <TestimonialCard author={'Roman'}>
            "This course helped me finally understand how Java works. 
            The instructor explained complex topics like OOP and loops in a simple way."
          </TestimonialCard>
        </div>
        <div className={`${classes.group} ${!spin ? classes.paused : ''}`} aria-hidden>
          <TestimonialCard author={'Aya'}> “The Python Intermediate course helped me move beyond the basics — 
            I finally understand how to work with APIs, OOP, and real-world projects.”
          </TestimonialCard>
          <TestimonialCard author={'Sultan'}> “Perfect introduction to JavaScript! The lessons were short, 
            clear, and fun." 
          </TestimonialCard>
          <TestimonialCard author={'Bauyrzhan'}>
            “This advanced JS course pushed my skills to the next level. I learned about 
            async programming, ES6 features, and performance optimization.  " 
          </TestimonialCard>
          <TestimonialCard author={'Alexander'}>
            "I started this course with zero knowledge of databases, and now I can confidently write 
            SQL queries to manage real data."
          </TestimonialCard>
          <TestimonialCard author={'Roman'}>
            "This course helped me finally understand how Java works. 
            The instructor explained complex topics like OOP and loops in a simple way."
          </TestimonialCard>
        </div>
      </div>
    </section>
  )

}