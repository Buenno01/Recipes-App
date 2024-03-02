import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './Layout';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Home /> } />
        <Route path="/drinks" element={ <Home /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/meals/:id/in-progress" element={ <InProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <InProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="*" element={ <p> Nao achei </p> } />
      </Route>
    </Routes>
  );
}

export default App;
