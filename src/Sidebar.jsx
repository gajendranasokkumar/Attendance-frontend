import React from 'react'
import ExpandBox from './ExpandBox'
import NewButton from './NewButton'

const Sidebar = () => {
    return (
        <>
            <div className='h-[92vh] w-[18%] bg-shadeWhite pt-[30px]'>
                <div className='h-[12%]'>
                    <NewButton />
                </div>
                <div className='h-[88%] overflow-y-auto'>
                    <ExpandBox number={1} name={"Attendance"}/>
                    <ExpandBox number={2} name={"Leave"}/>
                    
                </div>
            </div>
        </>
    )
}

export default Sidebar