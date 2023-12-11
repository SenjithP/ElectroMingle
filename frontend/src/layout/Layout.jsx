import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';

const Layout = () => {
  const location = useLocation();
  const isElectricianHome = location.pathname.endsWith('/electricianHome');
  const isClientElectricianChat = location.pathname.endsWith('/clientElectricianChat');

  return (
    <>
      <main>
        <Routers />
      </main>
      {!(isElectricianHome || isClientElectricianChat) && <Footer />}
    </>
  );
};

export default Layout;
