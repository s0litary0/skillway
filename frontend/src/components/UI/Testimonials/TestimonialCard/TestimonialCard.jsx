import classes from './TestimonialCard.module.css'
import { useState } from 'react'

export default function TestimonialCard({children, ...props}) {

  const [avatarIndex] = useState(Math.floor(Math.random() * 3) + 1)

  return (
    <div className={classes.card}>
      <p className={classes.comment}>{ children }</p>
      
      <div className={classes.author}>
        <img src={`/icons/testimonial_avatar_${avatarIndex}.svg`} alt="avatar" />
        <h4 className={classes.author__name}>{ props.author} </h4>
        <p className={classes.company}> {props.company} </p>
      </div>
    </div>
  )
}