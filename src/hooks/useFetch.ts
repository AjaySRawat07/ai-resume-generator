import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturn<T, A extends unknown[]> = {
  data: T | undefined;
  loading: boolean;
  error: string | null;
  fetchData: (...args: A) => Promise<void>; // Include fetchData explicitly
};

type Callback<T, A extends unknown[]> = (...args: A) => Promise<T>;

const useFetch = <T, A extends unknown[]>(cb: Callback<T, A>): UseFetchReturn<T, A> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (...args: A) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args); // Call the callback with arguments
      setData(response);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData }; // Include fetchData in the return object
};


export default useFetch;
