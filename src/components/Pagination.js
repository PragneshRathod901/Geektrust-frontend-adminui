import React from 'react';
import { NavigateBefore,NavigateNext ,LastPage,FirstPage } from '@mui/icons-material';
import './Pagination.css'

const Pagination=({pageNumber,SetPageNumber,PageCount})=>{
    let pageButtons=[];
    let numberOfButtonsToDisplay=3;
    const handleChangePage=(pageNum)=>{
        if(pageNum>=0 && pageNum<PageCount)
        {
        SetPageNumber(pageNum);
        }
    }
    const Initialize=()=>{
        if(pageNumber>numberOfButtonsToDisplay-1 && PageCount>numberOfButtonsToDisplay )
        {
            let startId=(PageCount-pageNumber)<numberOfButtonsToDisplay?PageCount-numberOfButtonsToDisplay:pageNumber;
            pageButtons.push(<button key={0} className={'normal'} onClick={()=>handleChangePage(0)}>{(1).toString()}</button>);
            pageButtons.push(<button key={'...'} >{'...'}</button>);
            
            for(let i=0;i<numberOfButtonsToDisplay;i++){
                let classname=startId===pageNumber?"secondary":'normal';
                pageButtons.push(<button key={startId} className={classname} onClick={()=>handleChangePage(startId)}>{(startId+1).toString()}</button>);
                startId++;
            }
            
        }else if(PageCount>numberOfButtonsToDisplay)
        {
            for(let i=0;i<numberOfButtonsToDisplay;i++){
                let classname=i===pageNumber?"secondary":'normal';
                pageButtons.push(<button key={i} className={classname} onClick={()=>handleChangePage(i)}>{(i+1).toString()}</button>);
            }
            pageButtons.push(<button key={'...'} >{'...'}</button>);
            pageButtons.push(<button key={PageCount} className={'normal'} onClick={()=>handleChangePage(PageCount-1)}>{(PageCount).toString()}</button>);
        }else{
            for(let i=0;i<PageCount;i++){
                let classname=i===pageNumber?"secondary":'normal';
                pageButtons.push(<button key={i} className={classname} onClick={()=>handleChangePage(i)}>{(i+1).toString()}</button>);
            }
        }
    }
    Initialize();
    return <div className='flexContainer'>
        <button key={'firstpage'}  onClick={()=>handleChangePage(0)}><FirstPage /></button>
        <button key={'prevPage'} onClick={()=>handleChangePage(pageNumber-1)}><NavigateBefore /></button>
        {pageButtons.map((item)=>(item))}
        <button key={"nextPage"}  onClick={()=>handleChangePage(pageNumber+1)}><NavigateNext /></button>
        <button key={'lastPage'}  onClick={()=>handleChangePage(PageCount-1)}><LastPage /></button>
    </div>
}
export default Pagination;