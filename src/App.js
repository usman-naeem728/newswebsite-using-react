import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const [Post, setPost] = useState([])

  useEffect(() => {
    axios.get("https://newsapi.org/v2/everything?q=tesla&from=2022-09-18&sortBy=publishedAt&apiKey=cae1a96dd747433a94c7bc66b73d9a86")
      .then((Response) => {
        console.log("response", Response.data.articles)
        setPost(Response.data.articles)
      }).catch((err) => {
        console.log("err", err)
      })
  }, [])


  return (
    <>
      <div className="App">
        <div className='nav1'>
          <h2>NEWS WORLD</h2>
        </div>
      </div>
      {
        Post.map((eachPost, i) => (
          <div className='mainPost container my-5'>
            <div className='card'>
              <img className='card-img-top' src={eachPost.urlToImage} width={100}></img>
              <div className='card-body'>
                <h5 className='card-title'> {eachPost.title} </h5>
                <p className='card-text'> {eachPost.description}</p>
                <a href={eachPost.url} target={'_blank'} className="btn btn-primary">Read more</a>
              </div>
            </div>
          </div>
        ))
      }



    </>
  );
}

export default App;







