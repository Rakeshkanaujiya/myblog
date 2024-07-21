import React from 'react'
// import './header.css'

function Header() {
  return (
    <div className="md:flex bg-indigo-500">
      <div className="md:w-[50%] w-full uppercase text-center grid place-content-center text-3xl py-36 px-10 font-extrabold leading-10">
        <h1 className="underline text-white">Voices of the public</h1>
        <span className="text-indigo-300 mt-2 md:mt-4 drop-shadow-md">
          where every voice finds its echo in the world!
        </span>
      </div>
      <div className="md:w-[50%] w-full">
        <img
          className="object-cover w-full h-full"
          src="https://www.hostgator.com/blog/wp-content/uploads/2018/10/Best-Website-Builder-for-Blogging.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Header
