import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CursorAudio from "./components/commons/cursor";
import { AnimatePresence } from "framer-motion";
import CheckCookie from "./components/commons/checkCookie";
import SessionWrapper from "./components/nextauth/wrapper";
import { HomeTextProvider } from "./components/commons/getHomeTexts";
import UserActivity from "./components/users/UserActivity";
import Reduxprovider from "./redux/stateProvider";
import CheckUserStatus from "./components/users/checkStatus";
import Script from "next/script";
import DisclaimerWindow from "./components/commons/disclaimerWindow";
import ActivityTracker from "./components/ActivityTracker";

export const metadata = {
  title: "Untitled",
  description: "Untitled",
  viewport: "width=device-width",
  openGraph: {
    title: "Untitled",
    siteName: "Untitled",
    description: "Untitled",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preload" href="./fonts/cg-times/Times CG.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/cg-times/Times CG Italic.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/cg-times/Times CG Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/cg-times/Times CG Bold Italic.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/avelir/AVELIRE.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/Billie Eilish/billie_eilish-webfont.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/Billie Eilish/billie_eilish-webfont.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Extralight.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Thin.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Light.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Medium.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Bold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/signifier/TestSignifier-Black.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="">
        <Reduxprovider>
          <SessionWrapper>
            <CursorAudio />
            {/* <CheckCookie/> */}
            <HomeTextProvider>
              <CheckUserStatus />
              <UserActivity />
              <ActivityTracker />
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </HomeTextProvider>
          </SessionWrapper>
        </Reduxprovider>
        <Script
          id="hotjar-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (c, s, q, u, a, r, e) {
                c.hj = c.hj || function(){ (c.hj.q = c.hj.q || []).push(arguments) };
                c._hjSettings = { hjid: a };
                r = s.getElementsByTagName('head')[0];
                e = s.createElement('script');
                e.async = true;
                e.src = q + c._hjSettings.hjid + u;
                r.appendChild(e);
            })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6368561);`
          }}
        />
      </body>
    </html>
  );
}