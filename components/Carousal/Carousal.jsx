import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import styles from "./Carousel.module.css";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }, [data.length, slide]);

  const prevSlide = useCallback(() => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  }, [data.length, slide]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <BsArrowLeftCircleFill
          onClick={prevSlide}
          className={styles.arrowLeft + " " + styles.arrow}
        />
        {data.map((item, index) => (
          <div
            key={index}
            className={slide === index ? styles.slide : styles.slideHidden}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
        ))}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className={styles.arrowRight + " " + styles.arrow}
        />
        <span className={styles.indicators}>
          {data.map((item, index) => (
            <button
              key={index}
              className={
                slide === index ? styles.indicator : styles.indicatorInactive
              }
              onClick={() => setSlide(index)}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Carousel;
