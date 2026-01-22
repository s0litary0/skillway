import classes from './Testimonials.module.css';
import TestimonialCard from './TestimonialCard/TestimonialCard.jsx';
import Toggle from '../Toggle/Toggle.jsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  const [spin, setSpin] = useState(true);

  const handleToggle = () => {
    setSpin((spin) => !spin);
  }

  return (
    <section className={classes.container}>
      <div className={classes.textArea}>
        <h2 className={`${classes.title}`}>{t('testimonials_title')}</h2>
        <p className={`text ${classes.text}`}>{t('testimonials_subtitle')}</p>
        <Toggle className={classes.toggle} onToggle={handleToggle}/>
      </div>
      <div className={classes.testimonialsCarousele}>
        <div className={`${classes.group} ${!spin ? classes.paused : ''}`}>
          <TestimonialCard author={'Aya'}>{t('testimonial_aya')}</TestimonialCard>
          <TestimonialCard author={'Sultan'}>{t('testimonial_sultan')}</TestimonialCard>
          <TestimonialCard author={'Bauyrzhan'}>{t('testimonial_bauyrzhan')}</TestimonialCard>
          <TestimonialCard author={'Alexander'}>{t('testimonial_alexander')}</TestimonialCard>
          <TestimonialCard author={'Roman'}>{t('testimonial_roman')}</TestimonialCard>
        </div>
        <div className={`${classes.group} ${!spin ? classes.paused : ''}`} aria-hidden>
          <TestimonialCard author={'Aya'}>{t('testimonial_aya')}</TestimonialCard>
          <TestimonialCard author={'Sultan'}>{t('testimonial_sultan')}</TestimonialCard>
          <TestimonialCard author={'Bauyrzhan'}>{t('testimonial_bauyrzhan')}</TestimonialCard>
          <TestimonialCard author={'Alexander'}>{t('testimonial_alexander')}</TestimonialCard>
          <TestimonialCard author={'Roman'}>{t('testimonial_roman')}</TestimonialCard>
        </div>
      </div>
    </section>
  );
}
