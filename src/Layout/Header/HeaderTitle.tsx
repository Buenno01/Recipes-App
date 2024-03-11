import { useLocation } from 'react-router-dom';
import getPageTitle from '../../utils/getPageTitle';
import getPageImage from '../../utils/getPageImage';

function HeaderTitle() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col justify-center content-center items-center my-6">
      <img
        className="h-8"
        src={ getPageImage(getPageTitle(pathname)) }
        alt="page icon"
      />
      <h1
        className="uppercase font-bold text-xl text-primary-purple mt-2"
        data-testid="page-title"
      >
        {getPageTitle(pathname)}
      </h1>
    </div>
  );
}

export default HeaderTitle;
