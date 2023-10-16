import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Footer from "./Footer";
import EditForm from "./EditForm";
import Pagination from "./Pagination";
import Table from "./Table";
import "./AdminPanel.css";
import axios, { Axios } from "axios";

const AdminPanel = () => {
  let [userDataList, SetUserData] = useState([]);
  let [selectionList, SetSelection] = useState([]);
  let [searchText, SetSearchText] = useState("");
  let [currentPgNum, SetPageNum] = useState(0);
  let [editModeData, SetEditMode] = useState();
  let [notification, SetNotification] = useState();
  let [debounceTime, SetDebounceTime] = useState();
  let item_per_page = 10;
  let curItemsToDisplay = [];
  let filteredUser = [];
  let timeToHideNotification=1000;
  
  /* Fetching UserDatas */
  useEffect(() => {
    getUsers().then((res) => {
      SetUserData(res);
    });
  }, []);

  //send user Notification about state or error
  const SendNotification = (notificationData) => {
    clearTimeout(debounceTime);
    SetNotification(notificationData);
    if (notificationData) {
      let time = setTimeout(() => {
        SetNotification(null);
      }, timeToHideNotification);
      SetDebounceTime(time);
    }
  };
  /* Handles Update of Search Text */
  const SearchUpdate = (e) => {
    SetSearchText(e.target.value);
    SetSelection([]);
  };

  /* Handles Selection of All Items */
  const SelectAllItem = () => {
    if (selectionList.length === item_per_page) {
      SetSelection([]);
      return;
    }
    let newList = [];
    curItemsToDisplay.forEach((item) => newList.push(item.id));
    SetSelection(newList);
  };
  /*  Update Selection of specific Item */
  const UpdateSelection = (itemId) => {
    let newList = [...selectionList];
    if (newList.includes(itemId)) {
      newList.splice(newList.indexOf(itemId), 1);
    } else {
      newList.push(itemId);
    }
    SetSelection(newList);
  };
  /* compare text in string */
  const checkIfKeyExist = (searchText, text) => text.includes(searchText);
  /* Check if item is selected */
  const doImChecked = (isMainCheckBox, itemId) => {
    if (isMainCheckBox) {
      return (
        selectionList.length === item_per_page ||
        selectionList.length === curItemsToDisplay.length
      );
    } else {
      return selectionList.includes(itemId);
    }
  };
  /* Get User Data */
  const getUsers = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      return res.data;
    } catch (e) {
      SendNotification({ message: e.message, type: "error-tag" });
      return [];
    }
  };
  /* Handle Deletion of users */
  const DeleteEvent = (event, idstoDelete) => {
    let newList = [...userDataList];
    idstoDelete.forEach((item) => {
      let index = newList.findIndex((a) => a.id === item);
      if (index !== -1) {
        newList.splice(index, 1);
      }
    });
    SetUserData(newList);
    SendNotification({ message: "Items Deleted", type: "success" });

    event.stopPropagation();
  };
  /* Handles Edit of User Data */
  const HandleEdit = (event, _userId) => {
    let id = userDataList.findIndex((item) => item.id === _userId);
    if (id >= 0) {
      SetEditMode({ ...userDataList[id] });
    }
    event.stopPropagation();
  };
  /* Handle Saving of userData */
  const HandleSaveUserData = (_userData) => {
    if (!_userData) {
      SetEditMode(null);
      return;
    }
    let id = userDataList.findIndex((item) => item.id === _userData.id);
    if (id >= 0) {
      userDataList[id] = { ..._userData };
    }
    SendNotification({ message: "user Edited", type: "success" });

    SetEditMode(null);
  };
  /* Handles Page change*/
  const handleChangePage = (newPage) => {
    SetPageNum(newPage);
    SetSelection([]);
  };
  /* Handles Main CheckBox Intermediate State */
  const handleIntermediate = (input) => {
    if (input) {
      input.indeterminate =
        selectionList.length > 0 &&
        selectionList.length !== item_per_page &&
        selectionList.length !== curItemsToDisplay.length;
    }
  };
  /* Handle Delete All that selected  */
  const HandlDeleteSelected = (event) => {
    DeleteEvent(event, selectionList);
    SetSelection([]);
  };

  //filters users on behalf of serach
  filteredUser = userDataList.filter(
    (item) =>
      !searchText ||
      checkIfKeyExist(searchText, item.name) ||
      checkIfKeyExist(searchText, item.email) ||
      checkIfKeyExist(searchText, item.role)
  );

  /* Handles filteringout userdata based on page selected */
  curItemsToDisplay = filteredUser.slice(
    currentPgNum * item_per_page,
    currentPgNum * item_per_page + item_per_page
  );
  return (
    <div className="grid-container">
      <Header searchText={searchText} SetSearchFn={SearchUpdate} />
      <div>
        {editModeData && (
          <EditForm
            currentUserData={editModeData}
            saveUserData={HandleSaveUserData}
          />
        )}
      </div>
      {notification && (
        <button
          className={`notification ${notification.type}`}
          onClick={() => SendNotification(null)}
        >
          {notification.message}
        </button>
      )}
      <div className="content">
        <Table
          doImChecked={doImChecked}
          handleIntermediate={handleIntermediate}
          SelectAllItem={SelectAllItem}
          curItemsToDisplay={curItemsToDisplay}
          UpdateSelection={UpdateSelection}
          HandleEdit={HandleEdit}
          DeleteEvent={DeleteEvent}
        />
      </div>
      <Footer
        children={[
          <button
            key="deletButton"
            variant="contained"
            className="error-tag"
            onClick={HandlDeleteSelected}
          >
            Delete Selected
          </button>,
          <Pagination
            key="pagination"
            PageCount={Math.ceil((filteredUser.length - 1) / item_per_page)}
            pageNumber={currentPgNum}
            SetPageNumber={handleChangePage}
            showFirstButton
            showLastButton
            color="secondary"
          />,
        ]}
      />
    </div>
  );
};
export default AdminPanel;
