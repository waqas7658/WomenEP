


import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobForm = ({ setShowJob, showJob }) => {
    console.log(typeof setShowJob);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id);
    const [formData, setFormData] = useState({
        name,
        goals: [],
        trainings: [{ title: '', date: '' }],
        qualifications: [],
        userId: user.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // For array fields, split the value by comma to convert it into an array
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'goals' || name === 'qualifications' ? value.split(',').map(item => item.trim()) : value,
        }));
    };

    const handleTrainingChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTrainings = [...formData.trainings];
        updatedTrainings[index][name] = value;

        setFormData(prevState => ({
            ...prevState,
            trainings: updatedTrainings,
        }));
    };

    const handleAddTraining = () => {
        setFormData(prevState => ({
            ...prevState,
            trainings: [...prevState.trainings, { title: '', date: '' }],
        }));
    };

    const handleRemoveTraining = (index) => {
        const updatedTrainings = [...formData.trainings];
        updatedTrainings.splice(index, 1);

        setFormData(prevState => ({
            ...prevState,
            trainings: updatedTrainings,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/career/career-development', formData);
            console.log(response.data);
            if (response.status == 200) {
                toast.success("Job Posted Successfully ")
                setShowJob(prevShowJob => !prevShowJob);

            }

        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goals">
                        Job Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Job Title"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goals">
                        Goals (comma-separated)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="goals"
                        type="text"
                        placeholder="Goal 1, Goal 2, ..."
                        name="goals"
                        value={formData.goals.join(', ')}
                        onChange={handleChange}
                    />
                </div>

                {formData.trainings.map((training, index) => (
                    <div key={index}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`trainingTitle${index}`}>
                                Training Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`trainingTitle${index}`}
                                type="text"
                                placeholder="Training Title"
                                name="title"
                                value={training.title}
                                onChange={(e) => handleTrainingChange(e, index)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`trainingDate${index}`}>
                                Training Date
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`trainingDate${index}`}
                                type="date"
                                name="date"
                                value={training.date}
                                onChange={(e) => handleTrainingChange(e, index)}
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleRemoveTraining(index)}
                        >
                            Remove Training
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
                    onClick={handleAddTraining}
                >
                    Add Training
                </button>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualifications">
                        Qualifications (comma-separated)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="qualifications"
                        type="text"
                        placeholder="Qualification 1, Qualification 2, ..."
                        name="qualifications"
                        value={formData.qualifications.join(', ')}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
