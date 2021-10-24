export default function Share({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.93334 13.1858L6.43417 11.2775C5.97734 11.7659 5.38416 12.1056 4.73174 12.2524C4.07931 12.3992 3.3978 12.3464 2.77578 12.1009C2.15375 11.8553 1.61998 11.4283 1.24382 10.8754C0.867655 10.3225 0.666504 9.66917 0.666504 9.00042C0.666504 8.33168 0.867655 7.67839 1.24382 7.12547C1.61998 6.57255 2.15375 6.14555 2.77578 5.89997C3.3978 5.6544 4.07931 5.6016 4.73174 5.74843C5.38416 5.89527 5.97734 6.23495 6.43417 6.72334L9.93417 4.81501C9.73547 4.0284 9.83047 3.19633 10.2014 2.47476C10.5723 1.75319 11.1936 1.19166 11.9489 0.895425C12.7042 0.599192 13.5416 0.588594 14.3042 0.865619C15.0667 1.14264 15.7021 1.68827 16.0911 2.40022C16.4801 3.11218 16.5962 3.94158 16.4174 4.73296C16.2387 5.52434 15.7775 6.22337 15.1202 6.69901C14.4629 7.17466 13.6548 7.39426 12.8472 7.31667C12.0396 7.23907 11.288 6.8696 10.7333 6.27751L7.23334 8.18584C7.36768 8.7203 7.36768 9.27971 7.23334 9.81417L10.7325 11.7225C11.2872 11.1304 12.0387 10.7609 12.8463 10.6833C13.6539 10.6057 14.4621 10.8254 15.1194 11.301C15.7766 11.7766 16.2379 12.4757 16.4166 13.2671C16.5953 14.0584 16.4793 14.8878 16.0903 15.5998C15.7012 16.3117 15.0659 16.8574 14.3033 17.1344C13.5408 17.4114 12.7034 17.4008 11.9481 17.1046C11.1928 16.8084 10.5714 16.2468 10.2005 15.5253C9.82964 14.8037 9.73464 13.9716 9.93334 13.185V13.1858ZM4.00001 10.6667C4.44204 10.6667 4.86596 10.4911 5.17852 10.1785C5.49108 9.86596 5.66668 9.44203 5.66668 9.00001C5.66668 8.55798 5.49108 8.13406 5.17852 7.8215C4.86596 7.50893 4.44204 7.33334 4.00001 7.33334C3.55798 7.33334 3.13406 7.50893 2.8215 7.8215C2.50894 8.13406 2.33334 8.55798 2.33334 9.00001C2.33334 9.44203 2.50894 9.86596 2.8215 10.1785C3.13406 10.4911 3.55798 10.6667 4.00001 10.6667ZM13.1667 5.66667C13.6087 5.66667 14.0326 5.49108 14.3452 5.17852C14.6577 4.86596 14.8333 4.44203 14.8333 4.00001C14.8333 3.55798 14.6577 3.13406 14.3452 2.8215C14.0326 2.50893 13.6087 2.33334 13.1667 2.33334C12.7246 2.33334 12.3007 2.50893 11.9882 2.8215C11.6756 3.13406 11.5 3.55798 11.5 4.00001C11.5 4.44203 11.6756 4.86596 11.9882 5.17852C12.3007 5.49108 12.7246 5.66667 13.1667 5.66667ZM13.1667 15.6667C13.6087 15.6667 14.0326 15.4911 14.3452 15.1785C14.6577 14.866 14.8333 14.442 14.8333 14C14.8333 13.558 14.6577 13.1341 14.3452 12.8215C14.0326 12.5089 13.6087 12.3333 13.1667 12.3333C12.7246 12.3333 12.3007 12.5089 11.9882 12.8215C11.6756 13.1341 11.5 13.558 11.5 14C11.5 14.442 11.6756 14.866 11.9882 15.1785C12.3007 15.4911 12.7246 15.6667 13.1667 15.6667Z"
        fill={fill}
      />
    </svg>
  );
}

Share.defaultProps = {
  width: "17",
  height: "18",
  fill: "#6C6C6C",
};
