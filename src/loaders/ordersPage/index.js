import React from 'react';
import ContentLoader from 'react-content-loader';
import useWindowWidth from '../../utils/useWindowWidth';

const OrdersLoader = (props) => {
  const windowWidth = useWindowWidth();
  return (
    <>
    {
      windowWidth[0] !== 0 && (
        <ContentLoader
          width={windowWidth[0] - 20}
          height={400}
          viewBox={`0 0 ${windowWidth[0] - 20} 400`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x={ (windowWidth[0]/8 - 10).toString() } y="140" rx="10" ry="10"  width= {(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString()} y="141" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString()} y="140" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString()} y="141" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString()} y="139" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString()} y="138" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />

          <rect x={ (windowWidth[0]/8 - 10).toString() }   y="197"    rx="10" ry="10"  width= {(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString()}  y="198" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString()}  y="197" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString()}  y="198" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString()}  y="196" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString()}  y="195" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />

          <rect x={ (windowWidth[0]/8 - 10).toString()  }   y="259"    rx="10" ry="10"  width= {(windowWidth[0]/8 - 10).toString() }  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString() }  y="260" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString() }  y="259" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString() }  y="260" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString() }  y="258" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString() }  y="257" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />

          <rect x={ (windowWidth[0]/8 - 10).toString()  }   y="317"    rx="10" ry="10"  width= {(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString() }  y="318" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString() }  y="317" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString() }  y="318" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString() }  y="316" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString() }  y="315" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() }   height="19" />

          <rect x={ (windowWidth[0]/8 - 10).toString()  }   y="380"    rx="10" ry="10"  width= {(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString() }  y="381" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()} height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString() }  y="380" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString() }  y="381" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()} height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString() }  y="379" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString() }  y="378" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}   height="19" />

          <rect x={ (windowWidth[0]/8 - 10).toString()  }   y="380"    rx="10" ry="10"  width= { (windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*2 - 10).toString() }  y="381" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()} height="19" />
          <rect x={(windowWidth[0]/8*3 - 10).toString() }  y="380" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}  height="19" />
          <rect x={(windowWidth[0]/8*4 - 10).toString() }  y="381" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString() } height="19" />
          <rect x={(windowWidth[0]/8*5 - 10).toString() }  y="379" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}   height="19" />
          <rect x={(windowWidth[0]/8*6 - 10).toString() }  y="378" rx="10" ry="10" width={(windowWidth[0]/8 - 10).toString()}   height="19" />
        </ContentLoader>
      )
    }
    </>
  );
};

export default OrdersLoader;
