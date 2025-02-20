import React, { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+254712345678",
        profilePic: null, // No predefined image URL
    });

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle profile update
    const handleUpdate = () => {
        setUser(formData);
        setEditing(false);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create local URL for preview
            setUser({ ...user, profilePic: imageUrl });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

            <div className="flex flex-col items-center">
                <label htmlFor="profilePic" className="cursor-pointer">
                    <img
                        src={user.profilePic || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                </label>
                <input
                    type="file"
                    id="profilePic"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <p className="text-sm text-gray-500 mt-2">Click to upload image</p>
            </div>

            <div className="mt-4">
                {editing ? (
                    <>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />

                        <label className="block text-sm font-medium mt-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />

                        <label className="block text-sm font-medium mt-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />

                        <button
                            onClick={handleUpdate}
                            className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-lg">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-lg">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-lg">
                            <strong>Phone:</strong> {user.phone}
                        </p>

                        <button
                            onClick={() => setEditing(true)}
                            className="w-full mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>

            <button className="w-full mt-4 text-red-600 hover:underline">
                Change Password
            </button>

            <button className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    );
};

export default Profile;
