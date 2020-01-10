영화 api

***
`const movieTitle = [
  "1번영화",
  "2번영화",
  "3번영화",
  "4번영화"
]

const movieImages = [
  "http://blogfiles.naver.net/20110801_39/nissi99_1312202518210uGpu1_JPEG/%B0%FA%C0%CF%B2%AE%C1%FA_%B0%FA%C0%CF%B2%AE%C1%FA%C8%B0%BF%EB%B9%FD_%C2%FC%BF%DC%B2%AE%C1%FA%C8%B0%BF%EB%B9%FD_02.jpg",
  "http://blogfiles.naver.net/20110727_12/midasyw_1311731448126dMgws_JPEG/B0FAC0CF1.jpg",
  "http://post.phinf.naver.net/20161019_190/1476845501910xCAfQ_JPEG/Ie_V-9BQKER7U6z6zwgzAAuClFMs.jpg",
  "http://blogfiles.naver.net/MjAxOTA4MDFfMjMz/MDAxNTY0NjYyMzMxMjMz.rhhCp5_LQjRAKKWiwiE-HWUeK2jsYewuoVbLKWU50w8g.e4M_7gHfZTxNcoIVy6mw8CahsqCxuoOZ1v4leJMOniIg.JPEG.roseapple9076/%B7%CE%C1%EE%BE%D6%C7%C3_%C6%F2%C5%C3%B7%CE%C1%EE%BE%D6%C7%C3_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3%C1%A1_%B7%CE%C1%EE%BE%D6%C7%C3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%C6%F2%C5%C3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3%C1%A1%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_3%C8%A3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%284%29.jpg"
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie title={movieTitle[0]} poster={movieImages[0]}/>
        <Movie title={movieTitle[1]} poster={movieImages[1]}/>
        <Movie title={movieTitle[2]} poster={movieImages[2]}/>
        <Movie title={movieTitle[3]} poster={movieImages[3]}/>
      </div>
    );
  }

}`
*** 
### map 사용해서 바꾼뒤

***
`const movies = [
  {
    title:"1번영화",
    poster:"http://blogfiles.naver.net/20110801_39/nissi99_1312202518210uGpu1_JPEG/%B0%FA%C0%CF%B2%AE%C1%FA_%B0%FA%C0%CF%B2%AE%C1%FA%C8%B0%BF%EB%B9%FD_%C2%FC%BF%DC%B2%AE%C1%FA%C8%B0%BF%EB%B9%FD_02.jpg"
  },
  {
    title:"2번영화",
    poster:"http://blogfiles.naver.net/20110727_12/midasyw_1311731448126dMgws_JPEG/B0FAC0CF1.jpg"
  },
  {
    title:"3번영화",
    poster:"http://post.phinf.naver.net/20161019_190/1476845501910xCAfQ_JPEG/Ie_V-9BQKER7U6z6zwgzAAuClFMs.jpg"
  },
  {
    title:"4번영화",
    poster:"http://blogfiles.naver.net/MjAxOTA4MDFfMjMz/MDAxNTY0NjYyMzMxMjMz.rhhCp5_LQjRAKKWiwiE-HWUeK2jsYewuoVbLKWU50w8g.e4M_7gHfZTxNcoIVy6mw8CahsqCxuoOZ1v4leJMOniIg.JPEG.roseapple9076/%B7%CE%C1%EE%BE%D6%C7%C3_%C6%F2%C5%C3%B7%CE%C1%EE%BE%D6%C7%C3_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3%C1%A1_%B7%CE%C1%EE%BE%D6%C7%C3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%C6%F2%C5%C3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%B7%CE%C1%EE%BE%D6%C7%C3%C6%F2%C5%C3%C1%A1%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_3%C8%A3%B0%FA%C0%CF%B9%D9%B1%B8%B4%CF_%284%29.jpg"
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map(movie => {
          return <Movie title={movie.title} poster={movie.poster} />
        })}
      </div>
    );
  }`
