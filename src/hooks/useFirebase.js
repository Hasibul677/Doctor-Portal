import { useEffect, useState } from "react";
import initializeAuthentication from "../pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken]= useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const creteAccountWithEmail = (email, password, name, history, location) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
                const newUser = { email, displayName: name }
                setUser(newUser);
                //save user to the database
                saveUser(email, name, 'POST')
                // semd name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    setError('');
                }).catch((error) => {
                    setError(error.message)
                });
                const destination = location?.state?.from || '/';
                history.push(destination);
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                .then(idToken=>{
                   setToken(idToken);
                })
                setError('')
            } else {
                setUser({})
                setError('')
            }
            setIsLoading(false)
        });
        return () => unSubscribe;
    }, []);

    const loginWithEmail = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                const destination = location?.state?.from || '/';
                history.push(destination);
                setError('')
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false));
    };

    const googleSignIn = (location, history) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user
                setUser(user);
                saveUser(user.email, user.displayName, 'PUT')
                const destination = location?.state?.from || '/';
                history.push(destination);
                setError('')
            }).catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false));

    }
  useEffect(()=>{
      fetch(`http://localhost:5000/users/${user.email}`)
      .then(res=> res.json())
      .then(data=> setAdmin(data.admin))
  },[user.email])

    const logOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setUser({});
            setError('')
        }).catch((error) => {
            setError(error.message);
        }).finally(() => setIsLoading(false));

    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName }
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
        setUser,
        error,
        setError,
        isLoading,
        setIsLoading,
        creteAccountWithEmail,
        loginWithEmail,
        logOut,
        googleSignIn,
        token
    }
};

export default useFirebase;