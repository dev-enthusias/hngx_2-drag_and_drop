import React, { useEffect, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase.config';

import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import andrea from '../assets/andrea.jpg';
import betelli from '../assets/bertelli.jpg';
import mohammed from '../assets/mohamed.jpg';
import sam from '../assets/sam-jhay.jpg';
import piac from '../assets/piacquadio.jpg';

export async function loader() {
  const user = auth.currentUser;

  //   if (!user) throw redirect('/signin');

  return user;
}

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([
    { img: betelli, name: 'Betelli' },
    { img: andrea, name: 'Andrea' },
    { img: mohammed, name: 'Mohammed' },
    { img: sam, name: 'Sam' },
    { img: piac, name: 'Piac' },
  ]);

  // Simulate loading effect
  useEffect(() => {
    window.onload = () => {
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    };
  }, [photos]);

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotos(array => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  return (
    <div className='px-5 py-4 min-h-screen'>
      <h1 className='text-2xl font-bold mb-2'>Welcome, to your gallery</h1>
      <p className='italic mb-4 tex-slate-500'>
        You can rearrange your photos in the way that best serves your interest
      </p>
      <form className='mb-3'>
        <input
          type='search'
          placeholder='Which picture are you looking for?'
          className='w-full border bg-slate-100 px-4 py-2 rounded-md'
          onChange={e => setSearchInput(e.target.value)}
        />
      </form>

      <p className='mb-2 text-red-500 text-semibold md:hidden'>
        Hold a little bit longer to drag the images to its new position
      </p>

      {isLoading ? (
        <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <SortableList
          onSortEnd={onSortEnd}
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'
          draggedItemClassName='dragged'
        >
          {photos
            .filter(photo => {
              return searchInput.toLowerCase() === ''
                ? photo
                : photo.name.toLowerCase().includes(searchInput);
            })
            .map((item, i) => (
              <SortableItem key={i}>
                <div className='h-56 border border-transparent relative'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className=' w-full h-full object-cover object-top'
                  />
                  <p className='absolute bottom-5 left-1/2 -translate-x-1/2 inline-block bg-black text-white px-3 py-1 rounded-md'>
                    {item.name}
                  </p>
                </div>
              </SortableItem>
            ))}
        </SortableList>
      )}
    </div>
  );
}
