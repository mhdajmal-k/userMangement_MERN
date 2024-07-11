import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser,deleteUser, logOutAdmin } from "../redux/adminSlice";
import EditUserModal from "./EditModal";
import CreateNewUser from "./createModal";
import PropTypes  from "prop-types";
import { succsess, waring } from "../utils/tostify";
import { useNavigate } from "react-router-dom";



const AdminDashboard = () => {
  const { loading, users, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setIsModalOpen(true);
    setCurrentUser(user);
  };

  const closeModal = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.userName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);
  
const handleDelate=(id)=>{
    try { 
      const response=dispatch(deleteUser(id)).unwrap();
      if(response){
        succsess(response.message)
      }
    } catch (error) {
        waring(error.error)
      
    }
}

const handleLogout=()=>{
  try {
    const response=dispatch(logOutAdmin)
    if(response){
      navigate("/admin/login")
    }
  } catch (error) {
    waring(error.message)
  }
}

 
  return (
    <React.Fragment>
      <nav className="flex justify-between bg-gray-800 text-white items-center">
        <div className="ml-7 uppercase text-lg font-semibold">
          <h3>Dashboard</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-60 pl-5 rounded-lg text-black"
          />
        </div>
        <div className="flex p-3 gap-6">
          <h5 className="text-lg font-semibold">Admin</h5>
          <button className="text-lg font-semibold rounded-lg bg-red-500 px-4 mr-3 hover:bg-red-600" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </nav>


        
      
      <section className="p-9">
      <h6 className="items-end bg-blue-500 max-w-fit px-2 rounded-lg py-1 cursor-pointer " onClick={()=>{setCreateModalOpen(true)}}>Create NewUser</h6>
        <div className="text-2xl font-bold mb-4 text-center">User Details</div>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">
                Profile
              </th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">
                Username
              </th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">
                Email
              </th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">
                Joined
              </th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((value) => (
                <tr key={value._id}  className="hover:bg-gray-100">
                  <td className="py-3 px-5 border-b border-gray-300">
                    {value.profilePic ? (
                      <img
                        src={value.profilePic}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img
                        src="../image/profile.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-300">
                    {value?.userName||"N/A"}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-300">
                    {value.email}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-300">
                    {new Date(value.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="bg-green-400 p-1 rounded-md"
                      onClick={() => handleEditClick(value)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 p-1 ml-2  rounded-md"
                      onClick={()=>handleDelate(value._id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </section>
      {isModalOpen && currentUser && (
        <EditUserModal user={currentUser} onClose={closeModal} />
      )}
      {createModalOpen&&<CreateNewUser onCloseCreateModal={setCreateModalOpen}/>}
    </React.Fragment>
  );
};

AdminDashboard.prototype={
  loading:PropTypes.bool,
  users:PropTypes.arrayOf(PropTypes.shape({
    _id:PropTypes.string.isRequired,
    userName:PropTypes.string,
    email:PropTypes.string
  })),
  error:PropTypes.string
}

export default AdminDashboard;
