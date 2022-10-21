import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment/moment';
import img from './imagen.jpg'


function App() {
  const [Post, setPost] = useState([])
  const [searchNews, setSearchNews] = useState("")
  const [lodaing, setLoading] = useState(false)
  const [islit, setlit] = useState(true)

  function toggel() {
    setlit(!islit)
    console.log("lit", islit)
  }

  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: searchNews, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4af0c4866bmsh9e303087aa9678ap1a85cdjsn9202652b7d5e',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    setLoading(true)
    axios.request(options).then(function (response) {
      console.log(response.data.value);
      setPost(response.data.value)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });

  }



  useEffect(() => {
    const option = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: "world wide", freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4af0c4866bmsh9e303087aa9678ap1a85cdjsn9202652b7d5e',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    setLoading(true)
    axios.request(option).then(function (response) {
      console.log(response.data.value);
      setPost(response.data.value)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });

    const options1 = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
      headers: {
        'X-RapidAPI-Key': '4af0c4866bmsh9e303087aa9678ap1a85cdjsn9202652b7d5e',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };
    
    axios.request(options1).then(function (response) {
      console.log("re",response.data.typeMatches[0].seriesMatches[0].seriesAdWrapper);
      console.log("re",response.data.typeMatches[0].seriesMatches[0].seriesAdWrapper.seriesName);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])



  return (
    <div className={(islit) ? "light" : "dark"}>
      <div>
        <div className="nav1">
          <h2>NEWS WORLD</h2>
        </div>
      </div>




      {/* input search bar  */}
      <div className='container'>
        {/* toogle button  */}
        <button onClick={toggel} className="tooglebtn">
          <i className={(islit) ? "fa fa-sun-o" : "fa fa-certificate"}  ></i>
        </button>
        <form className="input-group my-5" onSubmit={getNews}>
          <input type="text" className="form-control" placeholder='Search News' onChange={(e) => {
            setSearchNews(e.target.value)
          }} />
          <button className="btn btn-outline-secondary" type="submit">Search</button>
        </form>
      </div>

      {/* now start posting news  */}
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="alert alert-danger my-2 " role="alert">
            Trending News from {(searchNews === "") ? "World wide" : searchNews}
          </div>
          <div className="card card2" >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
            </ul>
          </div>

          <h1>{(lodaing) ? <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : ""}</h1>
          {
            Post.slice(0, 6).map((eachPost, i) => (
              <div className={`card mb-3 col-lg-6 col-sm-12 my-3  ${(islit) ? "light2" : "dark2"}`} >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={(eachPost?.image?.thumbnail?.contentUrl === undefined) ? img : eachPost.image.thumbnail.contentUrl.replace("&pid=News", "")
                      .replace("pid=News&", "").replace("pid=News", "")} className="img-fluid rounded-start my-4" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{eachPost.name}</h4>
                      <p className="card-text">{eachPost.description}</p>
                      <p className="card-text"><small className="text-muted">{moment(eachPost.datePublished).format('MMMM Do YYYY, h:mm a')}</small></p>
                      <a href={eachPost.url} className="btn btn-outline-success" target={"_blank"}>Read more</a>

                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="alert alert-success my-2 " role="alert">
            Popular News from {(searchNews === "") ? "World wide" : searchNews}
          </div>
          <h1>{(lodaing) ? <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : ""}</h1>

          {
            Post.slice(6, 10).map((eachPost, i) => (
              <div className={`card mb-3 col-lg-6 col-sm-12 my-3  ${(islit) ? "light2" : "dark2"}`}>
                {/* <p>sdas{(eachPost?.image?.thumbnail?.contentUrl === undefined)? <img src={img} /> : "aya"}</p> */}
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={(eachPost?.image?.thumbnail?.contentUrl === undefined) ? img : eachPost.image.thumbnail.contentUrl.replace("&pid=News", "")
                      .replace("pid=News&", "").replace("pid=News", "")} className="img-fluid rounded-start my-4" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{eachPost.name}</h4>
                      <p className="card-text">{eachPost.description}</p>
                      <p className="card-text"><small className="text-muted">{moment(eachPost.datePublished).format('MMMM Do YYYY, h:mm a')}</small></p>
                      <a href={eachPost.url} className="btn btn-outline-success" target={"_blank"}>Read more</a>

                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>



    </div>
  );
}

export default App;







