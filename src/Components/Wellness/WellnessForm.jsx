import React, { useState } from 'react';
import { BASEURL } from '../../Utils/BaseUrl';
import axios from 'axios';
import toast from 'react-hot-toast';

function WellnessForm({ setShowWellness, showWellness }) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        duration: '',
        image: null, // Initialize as null to indicate no file selected
        resources: [''],
        userId: user.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file, // Store the file object
            });
        }
    };

    const handleResourceChange = (e, index) => {
        const newResources = [...formData.resources];
        newResources[index] = e.target.value;
        setFormData({
            ...formData,
            resources: newResources,
        });
    };

    const handleAddResource = () => {
        setFormData({
            ...formData,
            resources: [...formData.resources, ''],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                data.append(key, formData[key], formData[key].name);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(`${BASEURL}/api/wellness/createWellness`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            if (response.status === 201) {
                toast.success("Job Posted Successfully ");
                setShowWellness(prevShowWellness => !prevShowWellness);
            }
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
                <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange} // Use handleFileChange for file inputs
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="resources" className="block text-sm font-medium text-gray-700">Resources</label>
                {formData.resources.map((resource, index) => (
                    <input
                        key={index}
                        type="text"
                        name={`resources-${index}`} // This name is not directly used for updating state
                        value={resource}
                        onChange={(e) => handleResourceChange(e, index)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                ))}
                <button
                    type="button"
                    onClick={handleAddResource}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Resource
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default WellnessForm;
