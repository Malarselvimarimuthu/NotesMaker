import React from 'react';
import { getInitails } from '../../utils/helper';

const ProfileInfo = () =>
{
 return(
    <div>
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitails("Malar Selvi")}
            </div>

            <div>
                <p className='text-sm font-medium'>Malar</p>
                <button className="" >
                    Logout 
                </button>
            </div>
        </div>
    </div>
 )
}
export default ProfileInfo;