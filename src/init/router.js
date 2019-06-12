import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import AppLayout from 'src/layout/app';
import Login from 'src/layout/login';

/* Demos */
import { Home } from 'src/page/home';
import { Welcome } from 'src/page/welcome';
import { About } from 'src/page/about';
import { ProgressBars } from 'src/page/progress-bars';
import { TableDemo } from 'src/page/table-demo';
import { ButtonDemo } from 'src/page/button-demo';
import { ModalDemo } from 'src/page/modal-demo';
import { TabsDemo } from 'src/page/tabs-demo';
import { InputDemo } from 'src/page/input-demo';
import { NotificationsDemo } from 'src/page/notifications-demo';
/* End Demos */

import { NotFound } from 'src/page/not-found';

// Redirect is got GH pages and can be deleted for forked projects
const redirect = <Redirect from="/react-webpack-skeleton" to="/" />;

// export const AppRouter = (
//   <Router>
//     {redirect}
//     <Route path='/login' component={Login} />
//     <Route component={AppLayout}>
//       <Route path='/' component={Home} />
//       <Route path='/about' component={About} />
//       <Route path='/progress-bars' component={ProgressBars} />
//       <Route path='/button-demo' component={ButtonDemo} />
//       <Route path='/modal-demo' component={ModalDemo} />
//       <Route path='/table-demo' component={TableDemo} />
//       <Route path='/tabs-demo' component={TabsDemo} />
//       <Route path='/input-demo' component={InputDemo} />
//       <Route path='/notifications-demo' component={NotificationsDemo} />
//       <Route path='/welcome' component={Welcome} />
//       <Route path="*" component={NotFound}/>
//     </Route>
//   </Router>
// );

function AppRouter() {
  return (
    <Router>
      {redirect}
      <Route path='/login' component={Login} />
      <Route component={AppLayout}>
        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/progress-bars' component={ProgressBars} />
        <Route path='/button-demo' component={ButtonDemo} />
        <Route path='/modal-demo' component={ModalDemo} />
        <Route path='/table-demo' component={TableDemo} />
        <Route path='/tabs-demo' component={TabsDemo} />
        <Route path='/input-demo' component={InputDemo} />
        <Route path='/notifications-demo' component={NotificationsDemo} />
        <Route path='/welcome' component={Welcome} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}

export default AppRouter;
