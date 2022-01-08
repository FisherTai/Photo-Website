import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [curSearch, setCursearch] = useState("");
  const searchUrl = `https://api.pexels.com/v1/search?query=${curSearch}&per_page=15&page=1`;
  let [data, setData] = useState(null);
  const auth = "563492ad6f91700001000001647b4227b11544b1885d32353a50aba8";
  const initUrl = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  // fetch data from pexels api
  const search = async (url) => {
    setPage(2);
    console.log(url);

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

  //獲取更多
  const morepicture = async () => {
    let newURL;
    if (curSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${curSearch}&per_page=15&page=${page}`;
    }
    console.log(newURL);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    setPage(page + 1); 
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  // 進入頁面時執行
  useEffect(() => {
    search(initUrl);
  }, []);

  //為了處理closure，要指定curSearch被改變的時候執行Effect
  useEffect(() => {
    if(curSearch===""){
      search(initUrl)
    } else {
      search(searchUrl);
    }
  }, [curSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCursearch(input);//這邊的參數是一個closure，下次進來後值才會被變更
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePictures">
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
