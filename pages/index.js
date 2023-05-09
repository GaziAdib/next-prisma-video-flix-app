import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import { getSession } from 'next-auth/react';
import useFavorites from '@/hooks/useFavorites';

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
  const { data: favorites = [] } = useFavorites();

  return (

    <>

      <Navbar />

      <Billboard />

      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div>


    </>

  )
} 
