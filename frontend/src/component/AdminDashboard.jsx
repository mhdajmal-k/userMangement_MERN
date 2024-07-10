import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/adminSlice";
import EditUserModal from "./EditModal";

const AdminDashboard = () => {
  const { loading, users, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

const handleEditClick=(user)=>{
setIsModalOpen(true)
setCurrentUser(user)
}

const closeModal=()=>{
  setCurrentUser(null)
  setIsModalOpen(false)
}
  return (
    <React.Fragment>
      <nav className="flex justify-between bg-gray-800 text-white items-center ">
        <div className="ml-7 uppercase text-lg font-semibold ">
          <h3>Dashboard</h3>
        </div>
        <div className="flex p-3 gap-6">
          <h5 className="text-lg font-semibold">Admin</h5>
          <button className="text-lg font-semibold rounded-lg bg-red-500 px-4 mr-3  hover:bg-red-600">
            LogOut
          </button>
        </div>
      </nav>
      <section className="p-6">
        <div className="text-2xl font-bold mb-4 text-center">User Details</div>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200 ">Profile</th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">Username</th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">Email</th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">Joined</th>
              <th className="py-3 px-5 border-b border-gray-300 bg-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((value) => (
                <tr key={value._id} className="hover:bg-gray-100">
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
                  <td className="py-3 px-5 border-b border-gray-300">{value.userName}</td>
                  <td className="py-3 px-5 border-b border-gray-300">{value.email}</td>
                  <td className="py-3 px-5 border-b border-gray-300">
                    {new Date(value.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button className="bg-green-400 p-1 rounded-md" onClick={()=>handleEditClick(value)}>Edit</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}
      </section>
      {isModalOpen&&currentUser&&(
        <EditUserModal user={currentUser} onClose={closeModal}/>
      )}
    </React.Fragment>
  );
};

export default AdminDashboard;
