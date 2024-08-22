
import React, { useEffect, useState } from 'react'
import records from '../api/records.json'
import DataTable from 'react-data-table-component'
import './App.css'
const App = () => {
 
  
 const [collage,setCollege]= useState(records);
 const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);

  const columns=[
    {
      name:"Rank",
      selector: row=>row.rank,
      sortable:true
    },
    
    {
      name :"Colleges",
      cell: row => (
        <div>
          {row.featured?<span className='feat'>featured</span>:<></>}
          <div className='college-name'>
            <img className='logo' src={row.logo} alt="" />
            <div >
              <strong className='top'>{row.name}</strong>
              <p className='extra'>{row.address}</p>
            </div>
          </div>
          <div className='cuttoff-special'>
             <p className='specialize'>{row.Specialisation}</p>
             <p>{row.cuttoff}</p>
          </div>
          <div className='links'>
             <a href="">Apply🛬</a>
             <a href="">📩Download</a>
          </div>
          
        </div>
      )
    },
    {
      name:"Fees",
      cell: row => (
        <div className='fees' >
          <p className='top'>{row.fees}</p>
          <p className='extra'>{row.Courses}</p>
          <p className='extra'>-first year fees</p>
          
        </div>
      ),
      selector: row=>row.fees,
      sortable:true
    },
    {
      name:"Placements",
      cell: row => (
        <div className='placements' >
          <div>
          <p className='top'>{row.placements}LPA</p>
          <p className='extra'>-average</p>
          </div>
          <div>
             <p className='top'>{row.placements+20}LPA</p>
             <p  className='extra'>-average</p>
          </div>
        </div>
      ),
    },
    {
      name:"Reviews",
      cell: row => (
        <div className='reviews' >
       
          <p className='top'>{row.rating}/5</p>
          <p  className='extra'>based on 487 ratings</p>
        
        </div>
      ),
      selector:row=>row.rating,
      sortable:true
    }
  ]
  
  const customCSS ={
    headCells :{
      style :{
        color:"white",
        backgroundColor:"#5B99C2",
        fontWeight:"bold",
        fontSize:"20px",
        
      }
    },
    cells :{
      style:{
        borderStyle:"solid",
        borderColor:"#EEEEEE",
        borderWidth:"1px"
      }
    }
   
  }

  const loadMoreData = () => {
    const nextPage = page + 1;
    const newRecords = records.slice(page * 10, nextPage * 10);

    if (newRecords.length === 0) {
      setHasMore(false);
      return;
    }

    setCollege(prev => [...prev, ...newRecords]);
    setPage(nextPage);
  };
  
 
 

  function handleSearch(event){
    const newData=records.filter(row =>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    })
    setCollege(newData);
  }
  return (
    <div>
       <div >
         <input className='search' onChange={handleSearch} type="text" placeholder='search kar le' />
       </div>
      <DataTable columns={columns} data={collage} fixedHeader={true} customStyles={customCSS}>
       
      </DataTable>
    </div>
  )
}

export default App
