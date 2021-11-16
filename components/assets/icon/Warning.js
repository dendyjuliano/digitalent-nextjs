import React from "react";

export default function Warning({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 100C22.385 100 0 77.615 0 50C0 22.385 22.385 0 50 0C77.615 0 100 22.385 100 50C100 77.615 77.615 100 50 100ZM50 90C60.6087 90 70.7828 85.7857 78.2843 78.2843C85.7857 70.7828 90 60.6087 90 50C90 39.3913 85.7857 29.2172 78.2843 21.7157C70.7828 14.2143 60.6087 10 50 10C39.3913 10 29.2172 14.2143 21.7157 21.7157C14.2143 29.2172 10 39.3913 10 50C10 60.6087 14.2143 70.7828 21.7157 78.2843C29.2172 85.7857 39.3913 90 50 90V90ZM45 65H55V75H45V65ZM45 25H55V55H45V25Z"
        fill={fill}
      />
    </svg>
  );
}

Warning.defaultProps = {
  width: "100",
  height: "100",
  fill: "#EE2D41",
};
