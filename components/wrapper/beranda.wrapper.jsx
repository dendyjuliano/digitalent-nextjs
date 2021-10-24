import React from 'react'
import dynamic from "next/dynamic";
import Head from "next/head";

import LoadingNavbar from "../../user-component/content/peserta/components/loader/LoadingNavbar";
import LoadingFooter from "../../user-component/content/peserta/components/loader/LoadingFooter";
// import NavigationBar from "../../user-component/components/template/Navbar.component"
// import Footer from "../../user-component/components/beranda/footer"

import "../../styles/beranda.module.css"

const NavigationBar = dynamic(
    () => import("../../user-component/components/template/Navbar.component"),
    {
      loading: function loadingNow() {
        return <LoadingNavbar />;
      },
      ssr: false,
    }
);

const Footer = dynamic(() => import("../../user-component/components/beranda/footer"), {
    loading: function loadingNow() {
      return <LoadingFooter />;
    },
    ssr: false,
});

const BerandaWrapper = ({ session, children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <NavigationBar session={session} />
                {children}
                <Footer />
            </div>

            
        </>
        
    )
}

export default BerandaWrapper