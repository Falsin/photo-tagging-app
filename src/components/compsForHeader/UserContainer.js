import "babel-polyfill";
import React from "react";
import styled from "styled-components";
import firebaseApp from "../../Firebase";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const Wrapper = styled.header`
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

export default function UserContainer(params) {
  initFirebaseAuth();

  return (
    <Wrapper>
      <div id="user-pic"></div>
      <div id="user-name"></div>
      <button id="sign-out" onClick={() => signOutUser()}>
        Sign-out
      </button>
      <button id="sign-in" onClick={() => signIn()}>
        Sign-in with Google
      </button>
    </Wrapper>
  )
}

async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function authStateObserver(user) {
  let signInBtn     = document.getElementById('sign-in');
  let signOutBtn    = document.getElementById('sign-out');
  let userNameElem  = document.getElementById('user-name');
  let userPicElem   = document.getElementById('user-pic');

  if (user) {
    userNameElem.textContent = getUserName();
    userPicElem.style.backgroundImage = `url(${getProfilePicUrl()})`

    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'block';
  } else {
    userNameElem.textContent = '';
    userPicElem.style.backgroundImage = '';
    
    signOutBtn.style.display = 'none';
    signInBtn.style.display = 'block';
  }
}

function signOutUser() {
  signOut(getAuth());
}