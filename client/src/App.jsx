import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './pages/Page';

function App() {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/pages');
        console.log(response.data.pages);
        const arr = response.data.pages;
        setPages(arr);
      } catch (error) {
        setError(true);
        console.error('Error fetching pages:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const Home = () => {
    const homePage = pages.find((page) => page.url === '/');
    return (
      homePage && (
        <Layout>
          <h1 className="text-5xl font-bold">{homePage.title}</h1>
          <p>{homePage.content}</p>
          <p>
            Page Content for URL:{' '}
            <span className="bg-emerald-400 p-2">{homePage.url}</span>
          </p>
        </Layout>
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route key="home" path="/" element={<Home />} />
        {pages.map((page) => (
          <Route
            key={page.id}
            path={`/${page.url}`}
            element={
              <Page
                key={page.id}
                title={page.title}
                content={page.content}
                url={page.url}
              />
            }
          />
        ))}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;
