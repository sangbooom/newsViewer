import React, { useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList.js";

const App = () => {
  return <NewsList />;
};

export default App;

// const [data, setData] = useState(null);
//   const onClick = async() => {
//     try {
//       const response = await axios.get('http://newsapi.org/v2/top-headlines?' +
//       'country=kr&' +
//       'apiKey=119313ac770a4caeacd597823ad83f8c');
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClick} >불러오기</button>
//       </div>
//       {data && <textarea cols={20} rows={7} value={JSON.stringify(data,null,2)} readOnly={true} />}
//     </div>
//   );
