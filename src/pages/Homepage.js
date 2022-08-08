import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import Pexels from "../api/Pixels";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [curSearch, setCursearch] = useState("");
  let [data, setData] = useState(null);

  // fetch data from pexels api
  const search = async () => {
    let result;
    if (curSearch === "") {
      result = await Pexels.getDefaultPictures();
    } else {
      result = await Pexels.getSearchPictures(curSearch);
    }
    setData(result);
  };

  //獲取更多
  const morepicture = async () => {
    const result = await Pexels.getMorePictures();
    setData(data.concat(result));
  };

  // 進入頁面時執行
  useEffect(async () => {
    const result = await Pexels.getDefaultPictures();
    setData(result);
  }, []);

  //為了處理closure，要指定curSearch被改變的時候執行Effect
  useEffect(() => {
    search();
  }, [curSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCursearch(input); //這邊的參數是一個closure，下次進來後值才會被變更
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
