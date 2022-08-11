import './App.css';
import HomeScreen from './screens/HomeScreen';
import { Routes, Route } from "react-router-dom";
import Login from './screens/LoginScreen';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from "./firebase";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { login, logout } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in");
        dispatch(login({
          uid: user.uid,
          email: user.email
        }))
      } else {
        // User is signed out
        // ...
        dispatch(logout());
        console.log("User logged out");
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      {(!user) ? <Login /> :
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      }
    </>
  );
}

export default App;
