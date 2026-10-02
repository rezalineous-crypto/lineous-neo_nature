"use client";
import React from "react";
interface PururaMapProps {
  className?: string;
}
const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d350.12929527315697!2d90.40910492852367!3d24.433704589962307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37566ec391b33787%3A0xbc9545354ca40da1!2sPurura%2C%20Bhaluka!5e0!3m2!1sen!2sbd!4v1790930848388!5m2!1sen!2sbd";
export default function PururaMap({ className = "" }: PururaMapProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {" "}
      <iframe
        src={MAP_URL}
        title="PURURA Resort Location"
        className="block h-[420px] w-full border-0 sm:h-[500px] lg:h-[600px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />{" "}
    </div>
  );
}
