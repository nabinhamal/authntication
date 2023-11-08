import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'


/**root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <div>Root Route</div>
    },
    {
        path: '/register',
        element: <dvi>Register route</dvi>
    },
])



export default function App ()  {
  return (
    <main >
   <RouterProvider router = {router}>
    
     </RouterProvider>
    </main>
  )
}

 