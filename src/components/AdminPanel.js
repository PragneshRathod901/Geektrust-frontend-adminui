import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import EditForm from "./EditForm";
import Pagination from "./Pagination";
import Table from "./Table";
import "./AdminPanel.css";
import axios, { Axios } from "axios";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const AdminPanel = () => {
  let [userDataList, SetUserData] = useState([]);
  let [selectionList, SetSelection] = useState([]);
  let [searchText, SetSearchText] = useState("");
  let [currentPgNum, SetPageNum] = useState(-1);
  let [editModeData, SetEditMode] = useState();
  let [notification, SetNotification] = useState();
  let [debounceTime_noti, SetDebounceTime] = useState();
  let item_per_page = 10;
  let curItemsToDisplay = [];
  let filteredUser = [];
  let timeToHideNotification = 1000;

  /* Fetching UserDatas */
  useEffect(() => {
    getUsers().then((res) => {
      SetUserData(res);
      SetPageNum(0);//update of page require after data change
    });
  }, []);

  //send user Notification about state or error
  const enqueSendNotification = (notificationData) => {
    clearTimeout(debounceTime_noti);
    SetNotification(notificationData);
    if (notificationData) {
      let time = setTimeout(() => {
        SetNotification(null);
      }, timeToHideNotification);
      SetDebounceTime(time);
    }
  };
  /* Handles Update of Search Text and reset selection*/
  const searchTextUpdate = (e) => {
    SetSearchText(e.target.value);
    SetSelection([]);
  };

  /* compare text in string */
  const checkIfKeyExist = (searchText, text) => text.includes(searchText);

  /* Get User Data */
  const getUsers = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      return res.data;
    } catch (e) {
      enqueSendNotification({ message: e.message, type: "error-tag" });
      return [];
    }
  };
  /* Handle Deletion of users */
  const deleteThisUsers = (idsToDelete) => {
    let newList = [...userDataList];
    let isUpdated = false;
    idsToDelete.forEach((item) => {
      let index = newList.findIndex((a) => a.id === item);
      if (index !== -1) {
        newList.splice(index, 1);
        isUpdated = true;
      }
    });
    //trigger re render if deleted
    if (isUpdated) {
      SetUserData(newList);
      enqueSendNotification({ message: "Items Deleted", type: "success" });
    }
  };

  /* Handles Edit of User Data */
  const startEditThisUser = (_userId) => {
    let id = userDataList.findIndex((item) => item.id === _userId);
    if (id >= 0) {
      SetEditMode({ ...userDataList[id] });
    }
  };

  /* Handle Saving of userData */
  const handleSaveUserData = (_userData) => {
    if (!_userData) {
      SetEditMode(null);
      return;
    }
    let id = userDataList.findIndex((item) => item.id === _userData.id);
    if (id >= 0) {
      userDataList[id] = { ..._userData };
    }
    enqueSendNotification({ message: "user Edited", type: "success" });

    SetEditMode(null);
  };

  /* Handles Page change*/
  const handleChangePage = (newPage) => {
    SetPageNum(newPage);
    SetSelection([]);
  };

  /* Handle Delete All that selected  */
  const handlDeleteSelected = () => {
    deleteThisUsers(selectionList);
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
      <Header searchText={searchText} SetSearchFn={searchTextUpdate} />
      <div>
        {editModeData && (
          <EditForm
            currentUserData={editModeData}
            saveUserData={handleSaveUserData}
          />
        )}
      </div>
      {notification && (
        <button
          className={`notification ${notification.type}`}
          onClick={() => enqueSendNotification(null)}
        >
          {notification.message}
        </button>
      )}
      <div className="content">
        <Table
          selectionList={selectionList}
          SetSelection={SetSelection}
          curItemsToDisplay={curItemsToDisplay}
          editUserData={startEditThisUser}
          deleteThisItem={deleteThisUsers}
        />
      </div>
      <Footer
        children={[
          <button
            key="deletButton"
            variant="contained"
            className="error-tag"
            onClick={handlDeleteSelected}
          >
            Delete Selected
          </button>,
          <Pagination
            key="pagination"
            pageCount={Math.ceil((filteredUser.length - 1) / item_per_page)}
            pageNumber={currentPgNum}
            SetPageNumber={handleChangePage}
          />,
        ]}
      />
    </div>
  );
};
export default AdminPanel;
