import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <div className='w-screen h-screen bg-[#1A191E]'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
