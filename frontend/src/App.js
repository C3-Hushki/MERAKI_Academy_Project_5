import "./App.css";
import { Login } from "./components/Auth/login/Login";
import Chat from "./components/services/Chat/chat";
import Process from "./components/services/Chat/process";
import Home from "./components/services/Chat/home";
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Auth/signup/signup";
import CreateFundRaiser from "./components/Header/Dropdown/Fundraiser/CreatefundRaiser";
import { useEffect,React, useState, } from "react";
import Section from "./components/section/section";
import Topfundraiser from "./components/TopFundraiser/Topfundraiser";
import Stories from "./components/stories/Stories";
import Leader from "./components/Leader/Leader";
import Random from "./components/Randomfundraisers/Random";
import FundRaiserView from "./components/FundRaiserView/FundRaiserView"
import CategoryByType from "./components/CategoryByType/CategoryByType";
import YourFundraisers from "./components/Header/Dropdown/AccountSettings/AccountSettings"
import DonateForSpecific from './components/Header/Dropdown/DonateForSpecific/DonateForSpecific';
import Footer from "./components/Footer/Footer";
import ReadyToStart from "./components/ReadyStart/ReadyToStart";
import AllCategory from "./components/AllCategory/AllCategory";
import CreateBloodPost from "./components/BloodPost/CreateBloodPost";
import MainPage from "./components/DashboradAdmin/MainPage";
import BloodPostView from "./components/BloodPost/BloodPostView"
import Donation from "./components/services/payment/Donation";
import { BsFillChatRightTextFill } from "react-icons/bs";
import AccountSettings from "./components/Header/Dropdown/AccountSettings/AccountSettings"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import axios from "axios";
  
    // mshan allah
    // mshan allah
    // mshan allah
const socket = io.connect("http://localhost:5000");
let userIdSave = localStorage.getItem("CurrentUserId");
//Notification
let x = "";
socket.on("notificationtarget",(data)=>{
  x=data.text
  console.log("notification data",data)
  if(data.owner==userIdSave){
    notify(x)
  }
})
const notify = () => toast(x)
//Notification


function Appmain(props) {
  return (
    <> 
      <div>
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
    </>
  );
}

function App() {
  let tokenSave = localStorage.getItem("token");
 


  return (
    <>
        <Navbar />
        <ToastContainer />
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            {/* if is logged in or token available history.push /  you should not enter signup while u have token or isslogged in up to */}
            <Route exact path="/signup"> 
              <Signup />
            </Route>
            <Route exact path="/">
              <Home socket={socket} />
              <Section/>
            <BloodPostView/>
              <Topfundraiser/>
              <Stories/>
              <Leader/>
              <Random/>
            <ReadyToStart/>
            </Route>
            <AccountSettings exact path ="/Drop/AccountSettings"/>
            <YourFundraisers exact path ="/Drop/YourFundraisers"/>
            <DonateForSpecific exact path ="/Drop/DonateForSpecific"/>
            <Route  exact path="/fundraiser"  component={CreateFundRaiser} />
            <Route exact path="/category/:id"  component={CategoryByType}/> 
            <Route exact path="/category/allCategory/Category" component={AllCategory}/>
            <Route  exact path="/fundraiser"  component={CreateFundRaiser} />
            <Route path="/chat/:roomname/:username" component={Appmain} />
            <Route  exact path="/fundraiserView/:id"  component={FundRaiserView} />
            <Route exact path="/adminPage" component={MainPage} />
            <Route exact path='/donation' component={Donation} />
            {/* <CreateBloodPost exact Path = "/Drop/CreateBloodPost"/>                    */}
          </Switch>
          
        </div>
        {/* <Footer/> */}
    </>
  );
}

export default App;
