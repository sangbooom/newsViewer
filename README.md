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
컴포넌트는 smart 컴포넌트와 dump 컴포넌트가 있다.

smart한 컴포넌트 : state가 있음
```
class Movie extends Component{
      static propTypes = {
      title: PropTypes.string,
      poster: PropTypes.string
    }
    
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <MoviePoster poster={this.props.poster} />
            </div>
        );
    }
}

class MoviePoster extends Component{
    render(){
        return(
            <img src ={poster} alt="MoviePoster" width="100" height="100" />
        );
    }
}
```

***

dump한 컴포넌트 : state가 없음. 이 컴포넌트를 쓰면 render function, will mount, did mount 등 다 필요없음 html을 return 하기만하면됨.

하지만 state를 잃게돼서 업데이트 하고 그런거 다 못함. 무비 포스터같은 컴포넌트에는 사용해도 괜춘함
```
function Movie({title,poster}){
    return(
        <div>
                <h1>{title}</h1>
                <MoviePoster poster={poster} />
        </div>
    )
}

function MoviePoster({poster}){
    return(
        <img src ={poster} alt="MoviePoster" width="100" height="100" />
    )
}

```
***
```
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  UNSAFE_componentWillMount() {
    fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e55a7610dadf4359d3729ab503c7205f')
      .then(res => res.json())
      .then(data => this.setState({
        posts: data.movieListResult.movieList[0].movieNm

      })
      );
      
  }


  render() {
    const { posts } = this.state;
    const postsList = posts.map((post) => (
      <div>
        <h4>{post.movieListResult.movieList[0].movieCd}</h4>
      { /* <h4>{post.movieListResult.movieList[0].movieNm}</h4>
        <h4>{post.movieListResult.movieList[0].movieNmEn}</h4>*/}
      </div>
    ));
    return (
      <div>
        {postsList}
      </div>
    );
  }
}

export default App;
``` 
구성을 바꿔봤는데 map이 함수가 아니라고 타입오류가 자꾸난다.. 삽질 이틀째
https://stackoverflow.com/questions/30803168/data-map-is-not-a-function/30803220 
