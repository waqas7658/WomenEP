import React from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import { BASEURL } from '../../Utils/BaseUrl'

const WellnessCard = ({ onDelete, item }) => {
    console.log(item)

    const handleDeleteWellness = async () => {
        try {
            await onDelete(item?._id);
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white relative">
                <div className='absolute right-0 top-3'>
                    <button onClick={() => handleDeleteWellness(item?._id)} ><MdOutlineDelete color='rgb(191 18 93 / var(--tw-bg-opacity))' size="30px" /></button>
                </div>
                <img className="w-full h-48 object-cover" src={`${BASEURL}/wellness/${item?.image}`} alt={item?.title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item?.title}</div>
                    <p className="text-gray-700 text-base line-clamp-2">{item?.description}</p>
                    <div className="mt-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1">{item?.category}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Duration: {item?.duration} days</span>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-1">Resources:</h2>
                        <ul className="list-disc list-inside">
                            {item?.resources.map((resource, index) => (
                                <li key={index}><a href={resource}>{resource}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div >

        </>
    )
}

export default WellnessCard