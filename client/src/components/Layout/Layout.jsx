import { Container } from '../UI/Container';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="h-full flex-auto flex align-middle justify-center p-8">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
