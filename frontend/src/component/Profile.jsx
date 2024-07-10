import React, { useEffect, useRef, useState,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firbaseConfig";
import { succsess, waring } from "../utils/tostify";
import { updateUser } from "../redux/useSlice";

const UserProfile = () => {
  console.log("hi in from userProfile")
  const fileRef = useRef(null);
  const { user, error,loading } = useSelector((state) => state.user);
  const [imageLoading, setImageLoading] = useState(0);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    ProfileImage: user.profileImage || "",
  });
  const [imageError, setImageError] = useState("");
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageLoading(Math.round(progress));
      },
      (error) => {
        setImageError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, ProfileImage: downloadURL }));
          setImageLoading(0);
          setImage(undefined);
        });
      }
    );
  };

  const handleForm = (e) => {
    console.log("from handileForm")
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handelSubmit = async (e) => {
    console.log("is from submit");
    e.preventDefault();
    console.log(formData);

    try {
      const response = await dispatch(updateUser({ ...formData, id: user.id })).unwrap();
      // console.log(response, "this is the response");
      if (response.message) {
        succsess(response.message);
      }
    } catch (error) {
      waring(error.error);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-slate-300">
        <h3 className="text-center font-bold p-5">Profile</h3>
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.ProfileImage || "/image/profile.png"}
              onClick={() => fileRef.current.click()}
              className="h-24 w-24 self-center p-3 cursor-pointer rounded-full"
              alt="profilePic"
            />
            {imageError && (
              <p className="text-red-500 text-center">{imageError}</p>
            )}
            {imageLoading > 0 && (
              <div className="text-center text-xs uppercase">
                {imageLoading < 100 ? (
                  <span className="text-green-500 text-sm">{`Image uploading ${imageLoading}%..`}</span>
                ) : (
                  <span className="text-green-500 text-xs">
                    Image uploaded successfully
                  </span>
                )}
              </div>
            )}

            <label className="pl-4 text-gray-700 font-semibold">
              Username:
            </label>
            <input
              value={formData.name}
              placeholder="Enter Name"
              id="name"
              type="text"
              onChange={handleForm}
              className="bg-gray-100 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="pl-4 text-gray-700 font-semibold">Email:</label>
            <input
              value={formData.email}
              placeholder="Enter your Email"
              type="text"
              id="email"
              onChange={handleForm}
              className="bg-gray-100 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="my-2 bg-green-500 p-1 mx-auto rounded-md px-8">
             {loading?"loading...":"Update"} 
            </button>
            <span className="text-red-500 text-sm">{error}</span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UserProfile);
