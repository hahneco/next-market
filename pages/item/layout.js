import Footer from "../../src/components/footer";
import Header from "../../src/components/header";
import "../../src/app/globals.css"


export const Layout = ({ children }) => {
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
