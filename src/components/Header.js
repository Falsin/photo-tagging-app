import firebaseApp from "../Firebase";
import "babel-polyfill";
import React from "react";
import styled from "styled-components";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const Wrapper = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 20vmin;
  background: darkblue;
`;

const UserContainer = styled.div`
  position: absolute;
  right: 0;
  color: white;
  display: flex;

  #sign-out {
    display: none;
  }

  #user-pic {
    position: relative;
    min-width: 30px;
    min-height: 30px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
  }
`;

export default function Header() {
  return (
    <Wrapper>
      <h1>Where's Waldo</h1>
      <UserContainer>
        <div id="user-pic"></div>
        <div id="user-name"></div>
        <button id="sign-out">
          Sign-out
        </button>
        <button id="sign-in" onClick={() => signIn()}>
          Sign-in with Google
        </button>
      </UserContainer>
    </Wrapper>
  )
}

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function authStateObserver(user) {
  if (user) {
    let signInBtn     = document.getElementById('sign-in');
    let signOutBtn    = document.getElementById('sign-out');
    let userNameElem  = document.getElementById('user-name');
    let userPicElem   = document.getElementById('user-pic');

    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'block';

    userNameElem.textContent = getUserName();
    userPicElem.style.backgroundImage = `url(${getProfilePicUrl()})`
  }
/*   if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  } */
 }

initFirebaseAuth();