import { Inter, Audiowide, Titillium_Web } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });
const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
const tilliumWeb = Titillium_Web({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "F1 Fan Project",
  description: "F1 Fan Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.png" sizes="any" />
      </head>

      <body className={audiowide.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
