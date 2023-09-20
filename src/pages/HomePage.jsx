import { auth } from '../firebase.config';
import { redirect, useLoaderData } from 'react-router-dom';

export async function loader() {
  const user = auth.currentUser;

  if (!user) throw redirect('/signin');

  return user;
}

export default function HomePage() {
  const user = useLoaderData();
  console.log(user);

  return <div>HomePage</div>;
}
