import {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';
import {Session} from '@supabase/supabase-js';

const useGetSession = () => {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return {session};
};

export default useGetSession;
