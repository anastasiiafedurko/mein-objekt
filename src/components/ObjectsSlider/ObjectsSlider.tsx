import "./ProductsSlider.scss";
import { useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "../ui/IconButton";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ObjectsSlider: React.FC<Props> = ({ title, children }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1">
        <h1 className="text-4xl font-mont-bold text-primary my-14">{title}</h1>
        <div className="flex justify-self-end items-center gap-4">
          <IconButton
            icon={<ChevronLeft />}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickPrev();
              }
            }}
          />

          <IconButton
            icon={<ChevronRight />}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickNext();
              }
            }}
          />
        </div>
      </div>
      <div>
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </div>
    </>
  );
};
