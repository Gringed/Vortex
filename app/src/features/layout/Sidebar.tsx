"use client";

import Link from "next/link";
import React, { useEffect } from "react";

export const Sidebar = () => {
  return (
    <div className="flex-1 flex justify-end items-start">
      <div className="sticky mx-8 top-32 flex items-end bg-secondary border border-gray-200 rounded-full  dark:border-muted flex-col  gap-8">
        <div className="flex flex-col  h-full items-center max-w-lg gap-6 mx-auto">
          <Link
            href={"/"}
            data-tooltip-target="tooltip-home"
            data-tooltip-placement="left"
            className="inline-flex flex-col h-full w-full items-center justify-center py-7 px-5 rounded-t-full  hover:bg-primary hover:text-white group"
          >
            <svg
              className="w-5 h-5 mb-1 dark:text-white text-gray-800 group-hover:text-secondary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <Link
            href={"/write"}
            data-tooltip-target="tooltip-layer"
            data-tooltip-placement="left"
            className="inline-flex items-center justify-center w-11 h-11 font-medium bg-primary rounded-full hover:bg-primary  group focus:ring-2 focus:ring-foreground focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-secondary group-hover:text-foreground dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">Nouveau Layer</span>
          </Link>
          <div
            id="tooltip-layer"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Nouveau Layer
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <Link
            href={"/profile"}
            data-tooltip-target="tooltip-profile"
            data-tooltip-placement="left"
            className="inline-flex flex-col h-full w-full items-center justify-center py-7 px-5 rounded-b-full  hover:bg-primary hover:text-white group"
          >
            <svg
              className="w-5 h-5 mb-1 dark:text-white text-gray-800 group-hover:text-secondary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="sr-only">Profil</span>
          </Link>
          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Profil
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </div>
  );
};
