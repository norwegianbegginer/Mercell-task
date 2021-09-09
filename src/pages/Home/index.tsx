import React from 'react';
import { Box, Container } from '@mui/material';
import { Switch, Route, Redirect } from 'react-router-dom';
import FallbackPage from '../FallbackPage';

const CountriesPageLazy = React.lazy(() => import(`../CountriesPage`));
const LanguagesPageLazy = React.lazy(() => import(`../LanguagesPage`));
const WrongLazy = React.lazy(() => import(`../WrongPage`));

const Home = () => (
  <Box
    style={{
      marginLeft: `250px`,
      position: `relative`,
      minHeight: `100%`,
      marginTop: `5vh`,
    }}
  >
    <React.Suspense fallback={<FallbackPage />}>
      <Box>
        <Container>
          <Switch>
            <Route exact path="/countries" component={CountriesPageLazy} />
            <Route exact path="/languages" component={LanguagesPageLazy} />
            <Route exact path="/">
              <Redirect to="/countries" />
            </Route>

            <Route exact component={WrongLazy} />
          </Switch>
        </Container>
      </Box>
    </React.Suspense>
  </Box>
);

export default Home;
