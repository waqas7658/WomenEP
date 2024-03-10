// JobCard.js

import React from 'react';

const JobCardMain = ({ job, }) => {

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
            <div className="px-6 py-4">

                <div className="font-bold text-xl mb-2">Job Title: {job.name}</div>
                <div className="mb-2">
                    <h2 className="text-lg font-semibold mb-1">Goals:</h2>
                    <ul className="list-disc list-inside">
                        {job.goals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-2">
                    <h2 className="text-lg font-semibold mb-1">Trainings:</h2>
                    <ul className="list-disc list-inside">
                        {job.trainings.map((training, index) => (
                            <li key={index}>{training.title} - {new Date(training.date).toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-1">Qualifications:</h2>
                    <ul className="list-disc list-inside">
                        {job.qualifications.map((qualification, index) => (
                            <li key={index}>{qualification}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JobCardMain;
