"use client";

import { useTheme } from "next-themes";
import React from "react";
import ProfilePic from "../../../public/logoLight.png";
import ProfilePicDark from "../../../public/logoDark.png";
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
            width={60}
            height={60}
            src={ProfilePic}
            alt="imageLogo"
            className="text-2xl mr-auto font-bold"
          />
        ) : (
          <Image
            width={60}
            height={60}
            src={ProfilePicDark}
            alt="imageLogo"
            className="text-2xl mr-auto font-bold"
          />
        )
      ) : (
        <Image
          width={60}
          height={60}
          src={ProfilePic}
          alt="imageLogo"
          className="text-2xl mr-auto font-bold"
        />
      )}
    </>
  );
};
