import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import Card from "../card/card";
import styles from "./search.module.scss";
import Slider from "react-slick";
import Head from "next/dist/shared/lib/head";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        image
        id
        species
      }
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <div>
        <form
          className={styles.search}
          onSubmit={(e) => {
            e.preventDefault();
            executeSearch({
              variables: { name: searchFilter },
            });
          }}
        >
          <input
            className={styles.input}
            required
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Find your character!"
          />
          <button className={styles.button}>Search</button>
        </form>
        <div className={styles.slider}>
          <Slider {...settings}>
            {data &&
              data.characters.results.map((item) => (
                <Card {...item} key={item.id} />
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Search;
