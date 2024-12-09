import {useEffect, useTransition, useState} from "react";

interface Options<T> {
  ready?: boolean;
  manual?: boolean;
  onSuccess?: (resp: T, args?: unknown[]) => void;
  onFailure?: (resp: T) => void;
}
function useRequest<T>(request: (...args: unknown[]) => Promise<T>, options: Options<T>) {
  const {
    ready = true,
    manual = false,
    onSuccess,
    onFailure,
  } = options;
  const requestArgs = request?.arguments || [];
  const [data, setData] = useState<T | null>(null);
  const [loading, setTransition] = useTransition();
  
  const requestRun = () => {
    setTransition(async () => {
      request()
        .then(response => {
          setData(response);
          if (onSuccess) {
            onSuccess(response, requestArgs);
          }
        })
      .catch(error => {
        if (onFailure)  {
          onFailure(error);
        }
      })
    })
  }
  
  useEffect(() => {
    if (!manual && ready) {
      requestRun();
    }
  }, [manual, ready]);
  
  return {
    run: requestRun,
    loading,
    data,
  }
}

export default useRequest;
