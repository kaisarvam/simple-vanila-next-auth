import { useEffect } from "react";
import { useRouter } from "next/router";

const useNoAuth = (redirectPath = "/") => {
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const token = data?.token;
    if (token) {
      router.push(redirectPath);
    }
  }, [redirectPath, router]);

  return null;
};

export default useNoAuth;
