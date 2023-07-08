import React from "react";

function useHttpClientHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return <div>http-hook</div>;
}

export default useHttpClientHook;
