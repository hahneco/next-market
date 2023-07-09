import Footer from "../../src/components/footer";
import Header from "../../src/components/header";
import "../../src/app/globals.css"
import { Props } from "../../utils/types";


const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          {children}
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout
