import "@/assets/css/loader.css";

interface LoadingPageProps {
  caption: string;
}

const LoadingPage = ({caption}: LoadingPageProps) => {
  return (
    <div className="container-loading h-screen w-full flex flex-col items-center justify-center">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
      <div className="loadingText">
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
