// Pages
// import eventLoader from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import About from './About';
import Blog from './Blog';
import Expermiments from './Experiments';
import Home from './Home';
import Page404 from './Page404';
import Post from './Post';
import ErrorPage from "./error-page";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/post/:blogid",
        element: <Post />,
        // loader: eventLoader,
      },
      {
        path: "/404",
        element: <Page404 />
      },
      {
        path: "/experiments",
        element: <Expermiments />
      },
    ],
  },
]);

export default Router