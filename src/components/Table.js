import React from "react";
import "./Table.css";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const Table = ({
  doImChecked,
  handleIntermediate,
  SelectAllItem,
  curItemsToDisplay,
  UpdateSelection,
  HandleEdit,
  DeleteEvent,
}) => {


  return (
    <div className="table boxShadow round4">
      <table>
        <thead>
          <tr className="tableHead">
            <td className="tablecell tableHead">
              <input
                type="checkbox"
                className="primary"
                checked={doImChecked(true, "")}
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
                className={doImChecked(false, _data.id) ? 'tableRow checked ' : 'tableRow '}
                onClick={() => UpdateSelection(_data.id)}
              >
                <td className="tablecell" align="left">
                  <input
                    type="checkbox"
                    className="primary"
                    checked={doImChecked(false, _data.id)}
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
                    onClick={(e) => HandleEdit(e, _data.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="normal"
                    onClick={(e) => DeleteEvent(e, [_data.id])}
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
