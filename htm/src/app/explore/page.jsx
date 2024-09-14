"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import NewsCard from "../../../component/newsCard";
import { configDotenv } from "dotenv";

export default function News() {
  let count = 0;
  let [news, setNews] = useState([]);
  useEffect(() => {
    console.log("aoikey", process.env.NEXT_PUBLIC_NEWS_API_KEY); // Ensure this is logged correctly

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );

        setNews(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchData();
  }, []);
  console.log(news);
  return (
    <>
      <h1 className="mt-24 ml-16 text-5xl font-serif underline ">
        Explore what is happening in your country
      </h1>
      <div className=" flex flex-wrap mt-32 justify-around  gap-y-14 gap-x-14 mb-11">
        {news.map((data) => {
          count++;
          return (
            <div key={count} className="h-[450px] ">
              <NewsCard data={data}></NewsCard>
            </div>
          );
        })}
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}
