import React ,{useEffect} from "react";
import {
  NavigateBefore,
  NavigateNext,
  LastPage,
  FirstPage,
} from "@mui/icons-material";
import "./Pagination.css";

const Pagination = ({ pageNumber, SetPageNumber, pageCount }) => {
  let pageButtons = [];
  let numberOfButtonsToDisplay = 3;

  //handles page change event
  const handleChangePage = (pageNum) => {
    if (pageNum >= 0 && pageNum < pageCount) {
      SetPageNumber(pageNum);
    }
  };

  //add number of buttons for page
  const AddItems = (startId, count) => {
    for (let i = 0; i < count; i++) {
      let classname = startId === pageNumber ? "secondary" : "normal";
      let id = startId;
      pageButtons.push(
        <button
          key={id}
          className={classname}
          onClick={() => handleChangePage(id)}
        >
          {(id + 1).toString()}
        </button>
      );
      startId++;
    }
  };

  const Initialize = () => {
    let needToAddDotAtFirst =
      pageNumber >= numberOfButtonsToDisplay - 1 &&
      pageCount > numberOfButtonsToDisplay;
    let needToAddDotAtlast =
      pageNumber + numberOfButtonsToDisplay <= pageCount &&
      pageCount > numberOfButtonsToDisplay;

    if (needToAddDotAtFirst && needToAddDotAtlast) {
      //display at first or at both
      pageButtons.push(<button key={"...first"}>{"..."}</button>);
      AddItems(pageNumber - 1, numberOfButtonsToDisplay);
    } else if (!needToAddDotAtlast && needToAddDotAtFirst) {
      //only display .. at last
      AddItems(pageCount - numberOfButtonsToDisplay, numberOfButtonsToDisplay);
    } //no display of ...
    else {
      AddItems(0, Math.min(pageCount, numberOfButtonsToDisplay));
    }
    //display dot ... at last if needed
    if (needToAddDotAtlast)
      pageButtons.push(<button key={"...last"}>{"..."}</button>);
  };
  Initialize();
  return (
    <div className="flexContainer">
      <button key={"firstpage"} onClick={() => handleChangePage(0)}>
        <FirstPage />
      </button>
      <button key={"prevPage"} onClick={() => handleChangePage(pageNumber - 1)}>
        <NavigateBefore />
      </button>
      {pageButtons.map((item) => item)}
      <button key={"nextPage"} onClick={() => handleChangePage(pageNumber + 1)}>
        <NavigateNext />
      </button>
      <button key={"lastPage"} onClick={() => handleChangePage(pageCount - 1)}>
        <LastPage />
      </button>
    </div>
  );
};
export default Pagination;
