import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Authlayout from './components/Authlayout.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Allpost from './Pages/Allpost.jsx'
import Post from './Pages/Post.jsx'
import Editpost from './Pages/Edit.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          // <Authlayout authentication={false}>
            <Login />
          // </Authlayout>
        )
      },
      {
        path: '/signup',
        element: (
          // <Authlayout authentication={false}>
            <Signup />
          // </Authlayout>
        )
      },
      {
        path: '/all-post',
        element: (
          <Authlayout authentication>
            <Allpost />
          </Authlayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <Authlayout authentication>
            <Post />
          </Authlayout>
        )
      },
      {
        path: '/editpost/:slug',
        element: (
          <Authlayout authentication>
            <Editpost />
          </Authlayout>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Authlayout authentication>
            <Post />
          </Authlayout>
        )
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
