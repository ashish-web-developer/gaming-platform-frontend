// types
import type { FC } from "react";

const ChatIcon: FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 43 39"
    >
      <g filter="url(#filter0_d_324_70)">
        <path
          fill={color}
          d="M33.556 6.718c-4.674-3.012-10.888-3.698-16.049-2.79C11.733-1.503 5.262.995 4 1.713c0 0 4.44 3.68 3.72 6.903-5.258 5.226-2.759 11.045 0 13.793C8.44 25.632 4 29.312 4 29.312c1.25.72 7.703 3.211 13.507-2.193 5.15.903 11.363.223 16.05-2.794 7.246-4.512 7.27-13.073 0-17.608zm-11.68 17.578a21.128 21.128 0 01-5.354-.674l-1.202 1.131a10.905 10.905 0 01-2.223 1.623 8.868 8.868 0 01-3.142.873c.06-.105.114-.21.168-.31 1.202-2.173 1.526-4.122.972-5.848-1.976-1.518-3.16-3.457-3.16-5.578 0-4.86 6.244-8.795 13.94-8.795 7.697 0 13.94 3.936 13.94 8.795s-6.243 8.783-13.94 8.783zm-6.688-6.691a2.114 2.114 0 01-1.48-.573 2.01 2.01 0 01-.635-1.425c-.042-2.69 4.122-2.749 4.164-.065v.03a1.97 1.97 0 01-.15.773c-.102.246-.252.47-.442.658-.19.19-.417.34-.667.443-.25.103-.519.158-.79.16v-.001zm4.482-1.998c-.048-2.69 4.116-2.755 4.164-.071v.036c.024 2.672-4.116 2.7-4.164.035zm8.713 1.998a2.115 2.115 0 01-1.481-.573 2.01 2.01 0 01-.635-1.425c-.041-2.69 4.123-2.749 4.165-.065v.03c.003.265-.047.528-.149.774-.1.246-.251.47-.442.66-.19.188-.417.339-.667.442-.25.103-.52.157-.791.158v-.001z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_324_70"
          width="43"
          height="38"
          x="0"
          y="0.514"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_324_70"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_324_70"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};
export default ChatIcon;
