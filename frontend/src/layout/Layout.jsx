import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';

const Layout = () => {
  const location = useLocation();
  const isElectricianHome = location.pathname.endsWith('/electricianHome');
  const isClientElectricianChat = location.pathname.endsWith('/clientElectricianChat');
  const meetingCall = location.pathname.includes('/meeting/');
  const adminLogin = location.pathname.includes('/admin')

  return (
    <>
      <main>
        <Routers />
      </main>
      {!(isElectricianHome || isClientElectricianChat || meetingCall ||adminLogin) && <Footer />}
    </>
  );
};

export default Layout;
