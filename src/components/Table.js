import React, { useState } from "react";
import "./Table.css";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const Table = ({
  selectionList,
  SetSelection,
  curItemsToDisplay,
  editUserData,
  deleteThisItem,
}) => {
  /* Handles Selection of All Items */
  const SelectAllItem = () => {
    if (selectionList.length === curItemsToDisplay.length) {
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

  /* Check if item of table is selected */
  const doImChecked = (itemId) => selectionList.includes(itemId);
  /* Check root Check box is  checked*/
  const doMainCheckBoxChecked = () =>
    selectionList.length === curItemsToDisplay.length;

  /* Handles root CheckBox Intermediate State */
  const handleIntermediate = (input) => {
    if (input) {
      input.indeterminate =
        selectionList.length > 0 &&
        selectionList.length !== curItemsToDisplay.length;
    }
  };

  /* Handle Delete Event*/
  const handleDeleteEvent = (dom_event, itemId) => {
    deleteThisItem([itemId]);
    dom_event.stopPropagation();
  };

  /* Handle Edit user data Event*/
  const handleEditEvent = (dom_event, itemId) => {
    editUserData(itemId);
    dom_event.stopPropagation();
  };

  return (
    <div className="table boxShadow round4">
      <table>
        <thead>
          <tr className="tableHead">
            <td className="tablecell tableHead">
              <input
                type="checkbox"
                className="primary"
                checked={doMainCheckBoxChecked()}
                ref={(input) => handleIntermediate(input)}
                onChange={() => SelectAllItem()}
              />
            </td>
            <td className="tablecell tableHead">Name</td>
            <td className="tablecell tableHead">Email</td>
            <td className="tablecell tableHead">Role</td>
            <td className="tablecell tableHead">Action</td>
          </tr>
        </thead>
        <tbody>
          {curItemsToDisplay &&
            curItemsToDisplay.map((_data) => (
              <tr
                key={_data.id}
                value={_data.id}
                role="checkbox"
                className={
                  doImChecked(_data.id) ? "tableRow checked " : "tableRow "
                }
                onClick={() => UpdateSelection(_data.id)}
              >
                <td className="tablecell" align="left">
                  <input
                    type="checkbox"
                    className="primary"
                    checked={doImChecked(_data.id)}
                    readOnly
                  />
                </td>
                <td className="tablecell" align="left">
                  {_data.name}
                </td>
                <td className="tablecell" align="left">
                  {_data.email}
                </td>
                <td className="tablecell" align="left">
                  {_data.role}
                </td>
                <td className="tablecell flexContainer" align="left">
                  <button
                    className="normal"
                    onClick={(e) => handleEditEvent(e, _data.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="normal"
                    onClick={(e) => handleDeleteEvent(e, _data.id)}
                  >
                    <DeleteForeverIcon color="error" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
