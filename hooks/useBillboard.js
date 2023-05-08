import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useBillboard = () => {
    const { data, isLoading, error, mutate } = useSWR('/api/random', fetcher, {
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

export default useBillboard
