import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRefreshCountries } from '../store/hooks';

const HomeLazy = React.lazy(() => import(`./Home`));
const WrongLazy = React.lazy(() => import(`./WrongPage`));

// A react component with react-router-dom switch and routes.
export const Routes = () => {
  const refreshCountries = useRefreshCountries();
  React.useEffect(() => {
    refreshCountries();
  }, []);

  return (
    <Switch>
      <Route path="/" component={HomeLazy} />
      <Route exact component={WrongLazy} />
    </Switch>
  );
};
