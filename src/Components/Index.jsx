import { BrowserRouter } from 'react-router-dom';
import Body from './Body/Body';
import Header from './Header/Header';
import Sidebar from './sidebar/Sidebar';

const Index = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Body />
      </BrowserRouter>
    </>
  );
};

export default Index;
