import "../styles/global.css";
import { Blobity } from "../components/blobity";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Blobity />
      <Component {...pageProps} />
    </>
  );
}
