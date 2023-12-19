import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MyProvider } from "./hooks/context-hook"
import { Routes, Route } from 'react-router-dom';

/// Views
import Body from "./views/Body"
import Dashboard from "./views/Dashboard"
import Footer from "./views/Footer"
import Header from "./views/Header"

import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import ForgotPasssword from "./components/Auth/ForgotPasword"
import ProtectedRoute from "./components/Auth/ProtectedRoutes"
import Home from "./components/Body/Home"

import Profile from "./components/Body/Profile/_Profile"
import ProfileView from "./components/Body/Profile/ProfileView"
import ProfileEdit from "./components/Body/Profile/ProfileEdit"
import SearchUsers from "./components/Body/SocialConnection/SearchUsers"

/// view Profiles

import ViewProfileView from "./components/Body/ViewProfile/ViewProfileView"
import ViewProfileGallery from "./components/Body/ViewProfile/ViewProfileGallery"
import ViewProfileGalleryImg from "./components/Body/ViewProfile/ViewProfileGalleryImg"

import Messages from "./components/Body/SocialConnection/Messages"
import Messaging from "./components/Body/SocialConnection/Messaging"

import Notifications from "./components/Body/Notifications"

import FeedNotifications from "./components/Body/Feed/FeedNotifications"

import ViewProfileGalleryImgNotification from './components/Body/Notifications/ViewProfileGalleryImgNotification'

import Landing from "./components/Body/Landing"

import '../node_modules/bootstrap/dist/css/bootstrap.css'

import './index.css'
import './css/Header.css'
import './css/Footer.css'
import './css/Body.css'
import './css/Register.css'
import './css/Feed.css'
import './css/Profile.css'
import './css/SocialConnections.css'
import './css/Notifications.css'




import ConnectionView from './components/Body/SocialConnection/ConnectionView.jsx'
import LocationSelector from './components/Auth/LocationSelector.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <>
    <MyProvider>

      <BrowserRouter>


        <Routes>

          <Route path="/" element={<App />} >

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPass" element={<ForgotPasssword />} />



            <Route path="/dev/" element={<LocationSelector />} />




            <Route element={<ProtectedRoute />}>

              <Route path="*" element={<Login />} />


              <Route path="/profile/:id" element={<ProfileView />} />
              <Route path="/notifications/:id" element={<Notifications />} />
              <Route path="/profileEdit/:id" element={<ProfileEdit />} />
              {/* <Route path="/updateUserInfo/:id/" element={<EditUserInfo />} /> */}
              <Route path="/users/profile/:id/" element={<ViewProfileView />} />
              <Route path="/users/profile/:id/gallery" element={<ViewProfileGallery/>} />
              <Route path="/users/profile/:id/gallery/:img" element={<ViewProfileGalleryImg/>} />
              <Route path="/galleryNotification/:id/gallery/:img" element={<ViewProfileGalleryImgNotification/>} />

              {/* <Route path="/users/messages/:id/" element={<ViewMessages />} /> */}
              <Route path="/landing/:id/" element={<Landing />} />
              <Route path="/messages/:id/:user" element={<Messages />} />
              <Route path="/messaging/:id" element={<Messaging />} />
              <Route path="/searchUsers/" element={<SearchUsers />} /> 
              <Route path="/socialConnections/" element={<ConnectionView />} />


              {/* <Route path="/users" */}


              <Route path="/feednotification/:id/" element={<FeedNotifications />} />
              {/* <Route path="/landing/:id:feed" element={<Landing />} /> */}
              <Route path="/home" element={<Home />} />
            </Route>


          </Route>


        </Routes>

      </BrowserRouter>

    </MyProvider>

    </>
  // {/* </React.StrictMode>, */}
)
