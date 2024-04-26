import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {checkUserAuthFx} from "@/app/api/auth";
import {$user, setUser} from "@/context/user";

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState<boolean>(false);
  const router = useRouter();
  const shouldCheckAuth = useRef(true);

  const checkUser = async () => {
    const user = await checkUserAuthFx('/users/login-check');

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true);
        return;
      }

      router.push('/dashboard');
      return;
    }

    if (user) {
      setUser(user);
      setShouldLoadContent(true);
      return;
    }

    router.push('/');
  }

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
      checkUser();
    }
  }, []);

  return { shouldLoadContent }
}

export default useRedirectByUserCheck;
