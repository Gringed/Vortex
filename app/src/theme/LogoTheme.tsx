"use client";

import { useTheme } from "next-themes";
import React from "react";
import ProfilePic from "../../../public/Group 9.png";
import ProfilePicDark from "../../../public/Group 10.png";
import Image from "next/image";
export const LogoTheme = () => {
  const { theme } = useTheme();
  const localStore =
    localStorage.getItem("theme");

  console.log(localStore);
  return (
    <>
      {localStore !== undefined ? (
        localStore === "light" ? (
          <Image
            width={40}
            height={40}
            src={ProfilePic}
            alt="imageLogo"
            className="text-2xl mr-auto font-bold"
          />
        ) : (
          <Image
            width={40}
            height={40}
            src={ProfilePicDark}
            alt="imageLogo"
            className="text-2xl mr-auto font-bold"
          />
        )
      ) : (
        <Image
          width={40}
          height={40}
          src={ProfilePic}
          alt="imageLogo"
          className="text-2xl mr-auto font-bold"
        />
      )}
    </>
  );
};
