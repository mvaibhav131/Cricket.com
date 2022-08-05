import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { Box, Grid, Heading, Text, Image } from "@chakra-ui/react";

const renderData = (data) => {
  return (
    <Box >
      <Grid
        templateRows="repeat(12,31rem)"
        templateColumns="repeat(1,26rem)"
        gap="6"
        padding={"1rem"}
        position='absolute'
        ml='33%'
        textAlign={"center"}
        
      >
        {data.map((elem, ind) => (
          <Box
            
            key={ind}
            border="1px"
            boxShadow="md"
            p="2"
            rounded="xl"
            bg="white"
            borderColor={"gray"}
            _hover={{ borderColor: "gray", borderWidth: "3px" }}
          >
            <Text fontSize={"22px"} as="i" m="auto" p={"2rem"} mb="1.5rem">
              Date: {elem.matchdate_local} ({elem.matchtime_local} IST)
            </Text>
            <Heading
              mb={"1rem"}
              mt="1rem"
              noOfLines={2}
              as="h2"
              size="lg"
              fontFamily={"san-serief"}
              color="orange"
            >
              {elem.league}
            </Heading>
            <Heading
              mb={"0.7rem"}
              noOfLines={2}
              as="h3"
              size="lg"
              color={"red"}
            >
              {elem.teama}
            </Heading>
            <Image
              borderRadius={"21rem"}
              src="https://thumbs.dreamstime.com/z/vs-versus-text-logo-battle-fight-game-vector-flat-cartoon-red-blue-color-symbol-design-emblem-logotype-vs-versus-text-168709300.jpg"
              w="30%"
              h="18%"
              ml={"40%"}
              alt="Dan Abramov"
            />
            <Heading mb={"1.5rem"} noOfLines={2} as="h3" size="lg" color="blue">
              {elem.teamb}
            </Heading>
            <Heading mb={"1rem"} noOfLines={2} as="h5" size="md" color="green">
              {elem.venue}
            </Heading>
            <Heading mb={"1rem"} noOfLines={2} as="h5" size="md" color="teal">
              Status : {elem.matchstatus}
            </Heading>
            <Heading size="md" as="h4" color="violet">
              {" "}
              Results : {elem.equation}
            </Heading>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

const Score = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const [pageNumberLimit, setPageNumberLimit] = useState(4);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const handleClick = (e) => {
    setCurrentPage(e.target.id);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPages = currentPage * itemsPerPage;
  const indexOfFirstPages = indexOfLastPages - itemsPerPage;
  const currentpage = data.slice(indexOfFirstPages, indexOfLastPages);

  const renderPageNumber = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get("http://localhost:8080/cricket");
      setData(res.data);
    };
    getData();
  }, []);
  // console.log(data);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handlePrev}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit > 1) {
    pageDecrementBtn = <li onClick={handleNext}>&hellip;</li>;
  }

  return (
    <>
      <Heading
        p={"11px"}
        color="purple"
        fontFamily={"san-serief"}
        as={"h1"}
        size="3xl"
        textAlign={"center"}
      >
        {" "}
        Cricket Schedule{" "}
      </Heading>
      <Box ml={'40%'}>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumber}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      </Box>
      
      {renderData(currentpage)}
    </>
  );
};

export default Score;
