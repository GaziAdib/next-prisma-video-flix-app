import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() {

  const { data: movies, isLoading, error } = useMovieList();

  return (

    <>

      <Navbar />

      <Billboard />

      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
      </div>


    </>

  )
} 
