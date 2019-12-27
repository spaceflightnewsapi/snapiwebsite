import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FeaturedCard from "./cards/FeaturedCard";
import Container from "react-bootstrap/Container";
import {Loading} from "./index";

const FeaturedNews = props => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('https://snapi.space/api/v1/articles?featured=true&limit=3');
    setFeatured(response.data.docs);
    setLoading(false)
  };

  return (
    <Container>
      <Row>
        {loading
          ?
          <Loading/>
          :
          <Row className="mt-2 justify-content-center" >
            <h1 className="font-weight-bold">Featured</h1>
            <Row>
              {featured.map(article => {
                return (
                  <Col key={article._id} className="p-1" sm={12} md={4} >
                    <FeaturedCard
                      title={article.title}
                      image_url={article.featured_image}
                      news_site={article.news_site_long}
                      url={article.url}
                    />
                  </Col>
                )
              })}
            </Row>
          </Row>
        }
      </Row>
    </Container>
  )
};

export default FeaturedNews;
