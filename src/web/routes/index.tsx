import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import Home from '@components/Home';
import NotFound from '@components/NotFound';
import FunctionComponentDemo from '@components/BestPractices/FunctionComponent';
import Hooks from '@components/BestPractices/Hooks';
import DefaultProps from '@components/BestPractices/DefaultProps';

// const { lazy, Suspense } = React;
// const Hooks = lazy(() => import('@components/BestPractices/Hooks'));

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/fc',
    exact: true,
    component: FunctionComponentDemo
  },
  {
    path: '/hc',
    exact: true,
    component: Hooks
  },
  {
    path: '/dp',
    exact: true,
    component: DefaultProps
  }
]

const Routes = () => (
  // <Suspense fallback={<div>loading...</div>}>
    <Switch>
      {
        routes.map((route, index) => {
          const { path, exact, component } = route;
          const Component: React.ComponentType<any> = component as any;
          return (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={(props)=>(
                <Component {...props}/>
              )}>
            </Route>
          )
        })
      }
      <Route component={NotFound}></Route>
    </Switch>
  // </Suspense>
)

export default Routes;
