/*import React from 'react'
import Header from '../Header/header';
//import Home from '../../Pages/Home';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <div>
      <script src="https://cdn.botpress.cloud/webchat/v2/inject.js"></script>
<script src="https://mediafiles.botpress.cloud/dad7acbb-aa51-4d41-863b-25a316322027/webchat/v2/config.js"></script>
      </div>
      <Footer/>
    </div>
  )
}

export default <Layout>*/


import React, { useEffect } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://mediafiles.botpress.cloud/dad7acbb-aa51-4d41-863b-25a316322027/webchat/v2/config.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <div id="botpress-webchat" />
      <Footer />
    </div>
  );
}

export default Layout;
