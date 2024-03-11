import React from 'react';
import LinkButton from '../../components/LinkButton';
import logoutBtn from '../../assets/images/logoutBtn.svg';
import favoriteRecipesBtn from '../../assets/images/favoriteIcon.svg';
import doneRecipesBtn from '../../assets/images/doneIcon.svg';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{"email": ""}');
  const clearStorage = () => localStorage.clear();

  const buttons = [
    {
      text: 'Done Recipes',
      to: '/done-recipes',
      'data-testid': 'profile-done-btn',
      imgSrc: doneRecipesBtn,
    },
    {
      text:
      'Favorite Recipes',
      to: '/favorite-recipes',
      className: 'border-b-2 border-t-2',
      'data-testid': 'profile-favorite-btn',
      imgSrc: favoriteRecipesBtn,
    },
    {
      text: 'Logout',
      to: '/',
      onClick: clearStorage,
      'data-testid': 'profile-logout-btn',
      imgSrc: logoutBtn,
    },
  ];

  return (
    <>
      Perfil
      <p
        className="text-lg text-center text-primary-black font-bold"
        data-testid="profile-email"
      >
        { user.email }
      </p>
      <ul
        className="text-lg text-primary-gray w-10/12 mx-auto"
      >
        {
          buttons.map(({ imgSrc, className, ...att }) => (
            <li
              className={ `px-8 py-8
              ${className || ''}` }
              key={ att.text }
            >
              <LinkButton
                className="flex items-center gap-4"
                { ...att }
              >
                <img src={ imgSrc } alt={ `${att.text}-button` } />
              </LinkButton>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default Profile;
