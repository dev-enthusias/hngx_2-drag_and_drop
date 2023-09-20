import React, { useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase.config';

export async function loader() {
  const user = auth.currentUser;

  //   if (!user) throw redirect('/signin');

  return user;
}

export default function HomePage() {
  const [searchInput, setSearchInput] = useState();
  const [photos, setPhotos] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  return (
    <div className='px-5 py-4'>
      <form className='mb-3'>
        <input
          type='search'
          placeholder='Which picture are you looking for?'
          className='w-full border bg-slate-100 px-4 py-2 rounded-md'
          onChange={e => setSearchInput(e.target.value)}
        />
      </form>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {photos.map((photo, i) => {
          return (
            <div key={i} className=' h-44 border'>
              {photo}
            </div>
          );
        })}
      </div>
    </div>
  );
}
