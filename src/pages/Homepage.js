import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const searchUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
  let [data, setData] = useState(null);
  const auth = "563492ad6f91700001000001647b4227b11544b1885d32353a50aba8";
  const initUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15";

  // fetch data from pexels api
  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  // 進入頁面時執行
  useEffect(() => {
    search(initUrl);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search search={() => search(searchUrl)} setInput={setInput}/>
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
