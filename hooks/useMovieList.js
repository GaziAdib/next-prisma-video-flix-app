import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useMovieList = () => {
    const { data, isLoading, error, mutate } = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useMovieList

