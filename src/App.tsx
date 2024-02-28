import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './Layout';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import InProgress from './pages/InProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route index path="/" element={ <Home /> } />
        <Route path="/details/:id" element={ <Details /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/in-progress" element={ <InProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
