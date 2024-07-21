import React from 'react'

export default function Footer() {
  return (
    <div className="w-full bg-indigo-950 mt-10 p-6 md:p-14">
      <div className="flex justify-center mb-10">
        <div className="w-[300px] md:w-[400px] flex justify-around">
          <img
            className="w-16 h-16 md:w-24 md:h-24 rounded-full"
            src="https://i.pinimg.com/originals/0c/15/70/0c1570ab3d80ba92672ce51b965aac20.jpg"
            alt=""
          />
          <div className="text-white">
            <h3 className=" uppercase md:text-lg text-md mb-2 md:mb-5 font-semibold">
              Contact us
            </h3>
            <p className="md:mb-2 mb-1 text-sm md:text-md">
              kanaujiyar38@gmail.com
            </p>
            <p className="text-sm md:text-md">8108022420</p>
          </div>
        </div>
      </div>
      <hr />
      <div className=" md:mt-5 mt-2 text-white text-xs flex justify-between">
        <p>© 2024 Rk, Inc. All rights reserved</p>
        <div>
          <span>Terms & Conditions |</span>
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
