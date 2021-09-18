import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';

import Loading from 'verdaccio-ui/components/Loading';
import { useAPI } from 'verdaccio-ui/providers/API/APIProvider';

import { PackageList } from './PackageList';

interface Props {
  isUserLoggedIn: boolean;
}

const TestPackage = () => {
  const packages = useSelector((state: RootState) => state.packages);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.packages.getPackages();
  }, [dispatch]);

  console.log('packages', packages);

  return (
    <div>
      {'hello1'}
      {'hello2'}
    </div>
  );
};

const Home: React.FC<Props> = ({ isUserLoggedIn }) => {
  const [packages, setPackages] = useState([]);
  const { getPackages } = useAPI();
  const [isLoading, setIsLoading] = useState(true);
  const loadPackages = useCallback(async () => {
    try {
      const packages = await getPackages();
      // FIXME add correct type for package
      setPackages(packages as never[]);
    } catch (error: any) {
      // FIXME: add dialog
      // eslint-disable-next-line no-console
      console.error({
        title: 'Warning',
        message: `Unable to load package list: ${error.message}`,
      });
    }
    setIsLoading(false);
  }, [getPackages]);
  useEffect(() => {
    loadPackages().then();
  }, [isUserLoggedIn, loadPackages]);

  return (
    <div className="container content" data-testid="home-page-container">
      <TestPackage />
      {isLoading ? <Loading /> : <PackageList packages={packages} />}
    </div>
  );
};

export default Home;
