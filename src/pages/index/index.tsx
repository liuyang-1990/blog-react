import React from 'react';
import { Card, Carousel } from 'antd';


const Article = props => {
  return (
    <>
      <Carousel autoplay arrows>
        <div>
          <img src="https://bing.ioliu.cn/v1" />
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </>

  )
};

Article.getInitialProps = async ({ req }) => {
  // const res = await httpClient.get('https://api.github.com/repos/zeit/next.js', { baseURL: "" });
  //const json = res.data;
  return {
    // disableSidebar: true,
  }
  // return { stars: json.stargazers_count }
}
export default Article;