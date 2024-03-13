/* eslint-disable no-mixed-spaces-and-tabs */
import React, { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";

import { TopManga } from "../../interfaces/MangaDexInterfaces";

import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { useNavigate } from "react-router-dom";

import { fetchTopManga } from "../../api/MalApi";
import { Translate } from "@mui/icons-material";
import "./HotMangaCarousel.css";

type Props = {
  children: ReactNode;
};

const baseUrl = "https://api.mangadex.org/";

interface CarouselItemProps {
  id: string;
  image: string;
  rank: string;
  title: string;
  author: string;
}

export const CarouselItem = (props: CarouselItemProps) => {
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState("");

  function handleClick(
    coverUrl: string,
    id: string,
    title: string,
    author: string
  ) {
    navigate("/individualView", {
      state:
        coverUrl === undefined
          ? { id: id, coverFile: coverFile }
          : { title: title, author: author },
    });
  }
  return (
    <div
      className="carousel-item"
      onClick={() => {
        handleClick(props.image, props.id, props.title, props.author);
      }}
    >
      <div className="carousel-text">
        <div className="title-text">
          {props.title.length > 26
            ? `${props.title.substring(0, 26)}...`
            : props.title}
        </div>
        <Typography
          color="#ebe814"
          sx={{ fontSize: { md: 23, lg: 23 } }}
          fontWeight="600"
          className="rank-Text"
        >
          {props.rank < "10" ? `0${props.rank}` : props.rank}
        </Typography>
      </div>
      <div className="carousel-image-div">
        <img className="carousel-image" src={props.image}></img>
      </div>
    </div>
  );
};

const HotMangaCarousel = (props: Props) => {
  const navigate = useNavigate();
  //const [index, setIndex] = useState(0);
  const [coverFile, setCoverFile] = useState("");
  const [topMangaData, setTopMangaData] = useState<TopManga[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function updateIndex(newIndex: number): void {
    if (newIndex < 0) {
      newIndex = 5;
    } else if (newIndex + 4 >= React.Children.count(props.children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }

  useEffect(() => {
    fetchTopManga().then((data: TopManga[]) => {
      setTopMangaData(data);
    });
  }, []);

  return (
    <div className="carousel">
      <div className="indicators">
        <KeyboardArrowLeftIcon
          sx={{
            color: "white",
            width: "50px",
            height: "50px",
            marginRight: "50px",
          }}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        ></KeyboardArrowLeftIcon>
      </div>
      <div className="carousel-selector">
        <Container
          disableGutters
          maxWidth={false}
          className="inner"
          sx={{
            overflow: { xs: "scroll", lg: "visible" },
            transform: {
              xs: "none",
              lg: `translateX(-${activeIndex * 20.1}%)`,
            },
          }} /**`translateX(-${activeIndex * 19.5}%)` */
        >
          {React.Children.map(props.children, (child: any, index: number) => {
            return React.cloneElement(child);
          })}
        </Container>
      </div>
      <div className="indicators">
        <KeyboardArrowRightIcon
          sx={{
            color: "white",
            width: "50px",
            height: "50px",
            marginLeft: "50px",
          }}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        ></KeyboardArrowRightIcon>
      </div>
    </div>
  );
};

export default HotMangaCarousel;