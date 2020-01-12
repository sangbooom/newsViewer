데이터의 소스는 한군데다. 메인 컴포넌트가 데이터 다 가지고있음.

타이틀, 영화 포스터 정보를 메인에 다 집어넣고, 그걸 각각 컴포넌트에 props를 이용해 정보를 출력하게함.

데이터 플로우 : 메인 컴포넌트가 전체정보 다 가지고있음 -> 각 칠드런 컴포넌트에게 정보를 전달함

그럼 한개의 데이터 소스를 가지고 각 컴포넌트별로 출력만 하면됨.
***

### 아래 코드는 효율적이지않음. 
몇개의 영화를 갖고있는지 모르는경우도있고, api에서 긁어온 엄청난 양의 영화정보를 불러오고 싶을때도 있을거임.
```
const movieTitle = [
  "1번영화",
  "2번영화",
  "3번영화",
  "4번영화"
]

const movieImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg"
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
```
***
### map을 활용해 배열 속 객체를 재구성하면 효율적이다.
```
const movies = [
  {
    title:"1번영화",
    poster:"1.jpg"
  },
  {
    title:"2번영화",
    poster:"2.jpg"
  },
  {
    title:"3번영화",
    poster:"3.jpg"
  },
  {
    title:"4번영화",
    poster:"4.jpg"
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
  }
```

***
React v15.5부터 React.PropTypes 는 별도 패키지로 옮겨졌다. 대신 prop-types 라이브러리를 사용하면된다.
```
import PropTypes from 'prop-types';

class Movie extends Component{
        static propTypes = {
        title: PropTypes.string,
        poster: PropTypes.string
    }
```

***
lifecycle api 공부하기. 개념
https://ndb796.tistory.com/227

***
loading states : 내가 필요한 데이터가 항상 바로 즉시 존재하지는않는다.

데이터없이 컴포넌트가 로딩을 하고, 데이터를 위해 api를 불러서 api가 데이터를 주면 내 컴포넌트 state를 업데이트 할것이다.
                
api 콜을 타임아웃 기능으로 유사 구현해보자.
                
```
  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index} />
    })
    return movies;
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading.."}
      </div>
    );
  }
}
```
***
컴포넌트가 다있는건 아니다. #13부터
