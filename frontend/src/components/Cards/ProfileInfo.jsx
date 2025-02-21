import React from 'react';
import { getInitails } from '../../utils/helper';
import { useEffect } from 'react';

const ProfileInfo = ({ userInfo, onLogout }) =>
{   
 return(
    <div>
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {/* {getInitails(userInfo.fullName)} */}
               
            </div>

            <div>
                <p className='text-sm font-medium'></p>
                <button className="" >
                    Logout 
                </button>
            </div>
        </div>
    </div>
 )
}
export default ProfileInfo;