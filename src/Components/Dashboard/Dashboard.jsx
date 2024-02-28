import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faBars, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import Modal from '../Modal/Modal';
import baseUrl from "../api";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import BacklogCard from "..//card/BacklogCard"
import DoneCard from "../card/DoneCard"
import ProgressCard from "../card/ProgressCard"
import TodoCard from "../card/TodoCard"

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [childData, setChildData] = useState([]);
  const [cardVisibility, setCardVisibility] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    try {
      axios.get(`${baseUrl}/user/getone/${userId}`).then((res) => {
        // console.log(res.data.user.fullName);
        setName(res.data.user.fullName);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      axios.get(`${baseUrl}/todo/getall/${id}`, config).then((res) => {
        // console.log(res.data);
        setChildData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [childData]);

  //delte toto api call
  const handleDeleteTodo = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.delete(`${baseUrl}/todo/delete/${id}`, config).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success('Todo Deleted!')
        }
      });
      // console.log("success");
    } catch (error) {
      console.log(error);
    }
  }
  // share todo api call
  const handleShareTodo = async (id) => {
    const currentUrl = window.location.href;

    // Append the ID to the current URL
    const shareableLink = `${currentUrl}/${id}`;

    // Copy the shareable link to the clipboard
    await navigator.clipboard.writeText(shareableLink);
    toast.success('Linked Copied!')

    // console.log("Shareable link copied to clipboard:", shareableLink);

  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDummyData = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        dummyDataVisible: !prevState[id]?.dummyDataVisible
      }
    }));
  };

  const togglethreedot = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        showOptions: !prevState[id]?.showOptions
      }
    }));
  };

  const handleCloseAllDropDown = () => {
    const updatedVisibility = {};
    for (const id in cardVisibility) {
      updatedVisibility[id] = { ...cardVisibility[id], showOptions: false, dummyDataVisible: false };
    }
    setCardVisibility(updatedVisibility);
  };

  const date = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  return (
    <div className='main-container'>
      <Toaster />
      <div className="topbox">
        <div className='headText'>welcome {name && `${name}`}</div>
        <div className='headTime'>{date()}</div>
      </div>

      <div className="head">
        <div><h3>board</h3></div>
        <div>
          <select name="" id="">
            <option value="">this week</option>
            <option value="">this month</option>
            <option value="">today</option>
          </select>
        </div>
      </div>

      <div className="parent-card">
        <div className="four-container">
          
          <BacklogCard />
          <TodoCard/>
          <ProgressCard />
          <DoneCard />
          
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
