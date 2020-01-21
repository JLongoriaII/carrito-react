import { useState, useEffect } from "react";

export default function useFetch(url, options) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResult(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [options, url]);

  return { loading, result, error };
}
