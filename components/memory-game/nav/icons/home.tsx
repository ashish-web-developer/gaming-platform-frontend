// types
import type { FC } from "react";

const HomeIcon: FC<{ width: number; height: number; color: string }> = ({
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
      viewBox="0 0 48 38"
    >
      <g filter="url(#filter0_d_324_69)">
        <path
          fill={color}
          d="M23.47 7.783l-12.803 10.17v10.976c0 .284.117.556.326.757.208.201.49.314.785.314l7.782-.02c.293 0 .574-.114.782-.315.207-.201.323-.473.323-.756v-6.41c0-.284.117-.557.325-.758.209-.2.491-.313.786-.313h4.444c.295 0 .577.113.786.313.208.201.325.474.325.758v6.405a1.07 1.07 0 00.324.76 1.114 1.114 0 00.787.315l7.779.021c.294 0 .577-.113.785-.314.209-.2.326-.473.326-.758V17.945l-12.8-10.162a.866.866 0 00-1.062 0zm20.222 6.912l-5.805-4.615V.804a.79.79 0 00-.244-.569.85.85 0 00-.589-.235h-3.889a.849.849 0 00-.589.235.79.79 0 00-.244.569v4.862L26.115.733a3.41 3.41 0 00-2.118-.732 3.41 3.41 0 00-2.117.732L4.302 14.695a.81.81 0 00-.298.544.776.776 0 00.187.588l1.771 2.076a.829.829 0 00.564.29.864.864 0 00.61-.18L23.47 5.036a.866.866 0 011.062 0l16.334 12.975a.842.842 0 00.61.181.856.856 0 00.564-.288l1.77-2.076a.795.795 0 00.186-.59.81.81 0 00-.303-.543z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_324_69"
          width="48"
          height="38"
          x="0"
          y="0"
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
            result="effect1_dropShadow_324_69"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_324_69"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default HomeIcon;
