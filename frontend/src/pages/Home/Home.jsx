import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { NoteCard } from '../../components/Cards/NoteCard';
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect } from 'react';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import NoteImg from '../../../public/emptynote.svg'
import NoDataImg from '../../../public/notNotFound.svg'

const Home = () =>
{
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null 
    });

    const [showToastMsg ,setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add"
    });

    const [allNotes,setAllNotes] = useState([]);
    const [userInfo , setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isSearch , setIsSearch] = useState(false);

    const navigate = useNavigate(); 

    const handleEdit = (noteDetails) =>{
        setOpenAddEditModal({ isShown: true, data:noteDetails, type: "edit"});
    };

    const showToastMessage = ( message, type) =>{
        setShowToastMsg({
            isShown: true,
            message,
            type
        });
    };

    const handleCloseToast = () =>{
        setShowToastMsg({
            isShown: false,
            message: ""
        });
    };

    // Get User Info
    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user)
            {
                setUserInfo(response.data.user);
                // console.log(response.data.user.fullName);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/login");
            }
        }finally {
            setLoading(false);
        }
    };

    // Get all notes
    const getAllNotes = async () =>{
        try{
            const response = await axiosInstance.get("/get-all-notes");

            if(response.data && response.data.notes){
                setAllNotes(response.data.notes);
            }
        }catch(error){
            setError(error.response.data.message);
        }
    }

    // Delete Note
    const deleteNote = async (data) =>{
        const noteId = data._id 
        try{
            const response = await axiosInstance.delete("/delete-note/" + noteId );
      
            if(response.data && !response.data.error )
            {
              showToastMessage("Note Deleted Successfully",'delete');
              getAllNotes();
            }
          }catch(error){
            if(error.response && error.response.data && error.response.data.message)
            {
              setError(error.response.data.message);
              console.log("An unexpected error occured. Please try again.");
            }
          }
    };

    // Search for a Note
    const onSearchNote = async (query)=>{
        try{
            const response = await axiosInstance.get("/search-notes",{
                params : { query },
            });

            if(response.data && response.data.notes){
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        }
        catch(error){
            setError(error.response.data.message);
            console.log(error);
        }
    }

    // Update Is Pinned Refer this 
    const updateIsPinned = async (noteData) =>{
        const noteId = noteData._id

        try{
          const response = await axiosInstance.put("/update-note-pinned/" + noteId ,{
            "isPinned": !noteData.isPinned
          });
    
          if(response.data && response.data.note ){
            showToastMessage("Note Updated Successfully")
            getAllNotes();
            onClose();
          }
        }catch(error){
          if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
          }
        }
    }

    // On Search Clear in Navbar
    const handleClearSearch = async() =>{
        setIsSearch(false);
        getAllNotes();
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        
      return () => {
        
      }
    }, []);

    useEffect(() => {
       
        console.log('userInfo updated:', userInfo);
    }, [userInfo]);
    
    // if (!userInfo) return <div>No user information available</div>;

    if (loading) return <div>Loading...</div>;
    return(
        <>
        <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
        <div className='container mx-auto'>
          {allNotes.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index)=>(
                <NoteCard
                key={item._id}
                title ={item.title}
                date = {item.createdOn}
                content = {item.content}
                tags = {item.tags}
                isPinned={item.isPinned}
                onEdit={()=> handleEdit(item)}
                onDelete={()=> deleteNote(item)}
                onPinNote={()=>updateIsPinned(item)}
                />               
            ))}
          </div>
    ) : (
        <EmptyCard 
        imgSrc={isSearch? NoDataImg :NoteImg} 
        message={isSearch? `Oops! No notes found matcing your search.` : `Start creating your first note! Click 'Add' button to start!`}
        />
    )}
        </div>
        <button 
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
            onClick={() =>{
                setOpenAddEditModal({isShown: true, type:"add", data:null});
            }}
        >
            <MdAdd className="text-[32px] text-white" />
        </button>
        
        <Modal
            isOpen = {openAddEditModal.isShown}
            onRequestClose={() => {}}
            style = {{
                overlay:{
                    backgroundColor:"rgba(0,0,0,0.2)"
                },
                }
            }
            contentLabel = ""
            className = "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
            <AddEditNotes
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose = {()=>{
                    setOpenAddEditModal({ isShown:false , type:"add" , data:null});
                }}
                getAllNotes = {getAllNotes}
                showToastMessage = {showToastMessage}
            />
        </Modal>
        
        <Toast
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
            /> 

        </>
    );
}

export default Home;