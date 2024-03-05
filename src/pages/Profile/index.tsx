import React from 'react';
import LinkButton from '../../components/LinkButton';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{"email": ""}');
  const clearUser = () => localStorage.clear();

  const buttons = [
    { text: 'Done Recipes', to: '/done-recipes', testId: 'profile-done-btn' },
    { text: 'Favorite Recipes', to: '/favorite-recipes', testId: 'profile-favorite-btn' },
    { text: 'Logout', to: '/', testId: 'profile-logout-btn' },
  ];

  return (
    <div data-testid="divProfilePage">
      Perfil
      <p data-testid="profile-email">
        { user.email }
      </p>
      <ul>
        {
          buttons.map(({ text, to, testId }) => (
            <li key={ text }>
              <LinkButton
                data-testid={ testId }
                text={ text }
                to={ to }
                onClick={ text === 'Logout' ? clearUser : undefined }
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Profile;
