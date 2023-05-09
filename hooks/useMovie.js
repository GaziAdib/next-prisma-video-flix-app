import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useMovie = (id) => {
    const { data, isLoading, error, mutate } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false
    });

    return {
        data,
        error,
        isLoading
    }
}

export default useMovie

