export default function Calender({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 1.875H9.875V0.875C9.875 0.80625 9.81875 0.75 9.75 0.75H8.875C8.80625 0.75 8.75 0.80625 8.75 0.875V1.875H4.75V0.875C4.75 0.80625 4.69375 0.75 4.625 0.75H3.75C3.68125 0.75 3.625 0.80625 3.625 0.875V1.875H1C0.723438 1.875 0.5 2.09844 0.5 2.375V12.75C0.5 13.0266 0.723438 13.25 1 13.25H12.5C12.7766 13.25 13 13.0266 13 12.75V2.375C13 2.09844 12.7766 1.875 12.5 1.875ZM11.875 12.125H1.625V6.1875H11.875V12.125ZM1.625 5.125V3H3.625V3.75C3.625 3.81875 3.68125 3.875 3.75 3.875H4.625C4.69375 3.875 4.75 3.81875 4.75 3.75V3H8.75V3.75C8.75 3.81875 8.80625 3.875 8.875 3.875H9.75C9.81875 3.875 9.875 3.81875 9.875 3.75V3H11.875V5.125H1.625Z"
        fill={fill}
        fillOpacity="0.25"
      />
    </svg>
  );
}

Calender.defaultProps = {
  width: "13",
  height: "14",
  fill: "black",
};
