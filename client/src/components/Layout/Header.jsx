import axios from 'axios';
import { Container } from '../UI/Container';
import { useState, useEffect } from 'react';

const Header = () => {
  const [pages, setPages] = useState([]);

  const data = async () => {
    const response = await axios.get('http://127.0.0.1:8080/api/pages');
    const arr = response.data.pages;
    setPages(arr);
  };

  useEffect(() => {
    data();
    console.log(pages);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full p-5 bg-gray-700">
      <Container>
        <nav className="nav">
          <ul className="flex align-middle justify-center gap-5">
            {pages.map((page) => (
              <li key={page.id} className="hover:underline">
                <a href={`http://localhost:5173/${page.url}`}>{page.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
