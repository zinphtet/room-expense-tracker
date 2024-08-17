import {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';
import {Session} from '@supabase/supabase-js';
import { useUserStore } from '../store/user';
const useGetSession = () => {
  const [session, setSession] = useState<Session | null>();
  const {setUser}  = useUserStore()
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setUser(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session)
    });
  }, []);
  return {session};
};

export default useGetSession;
