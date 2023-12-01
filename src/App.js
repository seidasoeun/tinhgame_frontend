import React from 'react';
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Profile from './componant/profile';
import Post from './componant/post';

import PrivateRoutes from './PrivateRoutes';
import Box from './componant/login/Box';

import PrivateRoutesAdmin from './PrivateRoutesAdmin';
import Admin from './admin_khleang/Admin';
import Inbox from './componant/inbox/Inbox';

import Inbox_toadmin from './admin_khleang/Inbox_toadmin';
import Refresh from './admin_khleang/Refresh';
import Feedback from './componant/feedback/Feedback';
import Content from './componant/content/Content';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/inbox_toadmin' element={<Inbox_toadmin/>}></Route>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path='/login/*' element={<Box/>}></Route>
        {/* <Route path='/Post' element={<Post/>}></Route>
        <Route path='/Profile/*' element={<Profile/>}></Route> */}

        <Route element={<PrivateRoutes />}>
          <Route path='/Post' element={<Post/>}></Route>
          <Route path='/Profile/*' element={<Profile/>}></Route>
          <Route element={<PrivateRoutesAdmin/>}>
            <Route path='/Admin/*' element={<Admin/>}></Route>
          </Route>
          <Route path='/Inbox' element={<Inbox/>}></Route>
          <Route path='/refresh' element={<Refresh/>}></Route>
          <Route path='/feedback' element={<Feedback/>}></Route>
          <Route path='/content/:id' element={<Content/>}></Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
