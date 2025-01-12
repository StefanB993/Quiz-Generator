export default function useFetch() {
  async function fetchData(endpoint, onDataReceived, onError, onLoading) {
    try {
      onLoading();
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.response_code === 1)
        throw new Error(
          "The API doesn't have enough questions for your query."
        );
      if (data.response_code === 5)
        throw new Error(
          "Too many requests have occurred. Each IP can only access the API once every 5 seconds."
        );
      if (!data.results.length) throw new Error("Something went wrong...");
      onDataReceived(data.results);
    } catch (err) {
      onError(err.message);
    }
  }

  return fetchData;
}
