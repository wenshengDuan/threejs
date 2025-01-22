import { useEffect, useRef } from "react";

export const useMount = (mount: () => void) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    mount();
    hasMounted.current = true;
  });
};
