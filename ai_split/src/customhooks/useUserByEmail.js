import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useUserByEmail = (email) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const userRef = doc(db, 'users', email);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          setError('User not found');
        }
      } catch (error) {
        setError('Error fetching user');
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUser();
    }

  }, [email]);

  return { user, loading, error };
};

export default useUserByEmail;