import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';
import React from 'react'

const Pagination = ({totalNotes,notesPerPage,setCurrentPage ,currentPage}) => {
    let pages = [];

    if(totalNotes&&notesPerPage){
        for(let i = 1;i<= Math.ceil(totalNotes/notesPerPage);i++){
            pages.push(i)
        }
    }
    
    const leftArrow = () =>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }else{
            return
        }
    }

    const rightArrow = () =>{ 
        if(currentPage < pages.length){
            setCurrentPage(currentPage+1)
        }else{
            return
        }
    }


  return (
    <div className='text-xl flex justify-center w-full gap-4 pt-[20px]'>
        <button className='flex items-center cursor-pointer' onClick={leftArrow}>
        <SquareArrowLeft />
        </button>
        {
            pages && pages.map((page,index)=>{
                return <button className={page === currentPage ? 'h-[20px] w-[20px] bg-gray-600/40 p-4 flex items-center justify-center' : ''} key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
            })
        }
        <button className='flex items-center' onClick={rightArrow}>
        <SquareArrowRight />
        </button>
    </div>
  )
}

export default Pagination