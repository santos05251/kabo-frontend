import React from "react";
import ContentLoader from "react-content-loader";
const HomeLoader = (props) => (
  <div>
    <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" height="100px" width="100%" {...props}>
      <rect x="0" y="0" width="200px" height="50px" />
    </ContentLoader>
   
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="47.9px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="230px" height="10.99px" />
        </ContentLoader>
      </div>
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="400px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="300px" />
        </ContentLoader>
      </div>
      <div className="grid md:grid-cols-2 gap-5 md:gap-2 xl:gap-10 grid-cols-1">
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="300px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="300px" />
        </ContentLoader>
      </div>
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="300px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="300px" />
        </ContentLoader>
      </div>
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="300px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="300px" />
        </ContentLoader>
      </div>
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="300px" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="300px" />
        </ContentLoader>
      </div>
      </div>
    </div>
  
);

export default HomeLoader;
