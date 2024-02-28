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
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route index path="/:recipeType" element={ <Home /> } />
        <Route path="/:recipeType/:id" element={ <Details /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/in-progress" element={ <InProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
