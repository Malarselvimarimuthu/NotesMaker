import React from "react";
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate,MdDelete} from "react-icons/md";
import moment from "moment";
export const NoteCard = ({
    title,
    date,
    content,
    tags = [],
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return(
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out relative">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-lg font-medium">{title}</h6>
                    <span className="text-xs text-slate">{moment(date).format('Do MM YYYY')}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn flex-shrink-0 top-2 right-2 ${isPinned ? 'text-primary':'text-slate-300'}`} onClick={onPinNote}/>
            </div>

            <div >
            <p className="text text-slate-700 mt-2 break-words whitespace-pre-wrap overflow-y-auto">{content?.slice(0,60)}</p>
            </div>
            <div className="mt-2">
                <div className="text-xs text-slate-500">{tags.map((item) => `#${item}`)}</div>
                <div className="flex items-center gap-2">
                    <MdCreate
                     className="icon-btn hover:text-green-600"
                     onClick = {onEdit}
                    />
                    <MdDelete
                     className="icon-btn hover:text-red-500"
                     onClick = {onDelete}
                    />
                </div>
            </div>
        </div>
    );
}