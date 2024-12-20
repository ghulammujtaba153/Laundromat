import React from 'react'

export default function Survelliance() {
    return (
        <div className='cameramaindiv backgroundimg'>
            <h2 className="text-4xl  md:text-5xl w-full h-full font-bold mb-7 mt-8 text-center text-primary-darkblue font-robottoblack">Monitoring Dashboard</h2>

            <div className='cameradiv mb-16'>
                <div className='footage shadow-xl'>
                    <video controls>
                        <source src="s1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='footage shadow-xl'>
                    <video controls>
                        <source src="s2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='footage shadow-xl'>
                    <video controls>
                        <source src="s2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className='footage shadow-xl'>
                    <video controls>
                        <source src="s1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}