// types
import type { FC } from "react";

const Play:FC<{size:number}> = ({size})=>{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 68 68"
    >
      <g filter="url(#filter0_d_176_59)">
        <path
          fill="url(#pattern0)"
          d="M4 0H64V60H4z"
          shapeRendering="crispEdges"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_176_59"
          width="68"
          height="68"
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
            result="effect1_dropShadow_176_59"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_176_59"
            result="shape"
          ></feBlend>
        </filter>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.01111)" xlinkHref="#image0_176_59"></use>
        </pattern>
        <image
          id="image0_176_59"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE8UlEQVR4nO2dSYhdRRSGSxM1DjitnEBFBddOG4cEUXdisoiCRjFG3ahpkyBus3MAJQZcuHWjK+MAtpi9irTETlBcqLgwjt1Ji+/V/59rOkfOy30SY7rTdtdwh/qgNs17r6u+vn1v1alT5zlXKBQKhUKhUCgUCoWloaqrqqq6WYAtArwswLsE9gv5HYFDBKRuh+qf7bfXCPCSvaeqqpvsM5b46/rFcDi8guSzAnxA4A8hdSWNwJwA75OcGA6Hl7s+o6pni/cPC7mXwPxK5S4i/YiQH4v3m1R1jesLqnqeXWlCHowld0Hp5G8C7FTVC1xXUdUzSD5HYDa14JNc5bMkd1ifXJeovL+dwIHcgv/TgG8A3OXajt0TSb5O4Gh2qQtf3da33ap6lmsjAK4i+VlukbJ04V8AuNa1Cft3DDFNk/Sy5wDc6doAyQ2ErSjyi5PlyRYRecA1mQp4MuacWNLJnhfgCddESK6vFwfZRUko2SL3uyZh9zUCzC1HwssWAPe4JkDyujY++OT/PSCvySrZ5p42LcotQ+LLnso6z7bFSG4Jkq7tzrmsbuyKT8Jf1Ucr79cmlayqqwlM5x68pJd9IGkgyqJwuQctuWST21LGk2d6LHrGHEQXTfL53IOV/LJ3xN9+In+JOgjgLZJbBfgqt9BF2k9Rt8XqPb6og1DVi+o/6moAzzRhR+akzfuH4okm98YegDsBEy/AawT+yi73320yimTbtk8RNHILQPJ6AT5sgOB/gk5RUhlGeRcJBuBO3Y/1Qn6bW7Q1AE8HF23JLU0QfdyO+kT2YBbwjguJpVgRONwU0WMGg8GlJN/IFQc3J0HTz0a5cIk675bZP5Kf5JBdVdWNwUQL8HiTRY8hea+QPySVDWx2oRhldbZAtKGq59jqlcCfiUS/4EIhwHttEX1Chuqb0UO5IR+IKUOiLjCV93cQ2Berv/bZwTqb8r7nIqCqp4v3j0SK03wfrKMpw6IuIpauK8ArIaeDJH8P1sFR9k4HRI+x4H0w0QBdKDooenszRXfn1nGhAK+GTFsLeusoD0Mmehi2e3q3tj3Tu7Jg0SQLlrYtwQXYScC3cQm+pemiVfU0EdmYIaj0aJ/CpLeQ/DSp4HETuaFPgf/5TgT+DTtb3RTRqnpmJ7eyjPpYcXbRJDdYVYOsgusG4KngoofD4WXZ0w3Iydxyx81cDAaDS1wMRlUCEotW1Yt7lUAzEu39ppQpYSS31gVQtHFN5MHYSY4/xxwAgbfrIilfZ5e5cDsYvfZHn5PQZXwxkNtdbFT1XAsN9ljyTJJEdMMSsXssesIlPiz0Ze8kI/FhIaPy/rZy/C0Rdsgx91UmqRqwy2U+ojzVg1vG5xZfcTmxA+mjgn7dlXwYwNWuCQBY1+aqM7J4GYm7XZMgeV8HC6NsdE3EyuN0pNTPEcsJd02mLvnT2tsIrZJO00r8nKL0z1xLH3zrXJvw3l+ZbcOUy5I8lb2kz0rm2baoYYMLqIz6BuzKPk8OuFyfbqDk6cr7W12X0GM7JtuaEGK1PlgUzvrkuooei2fbjvqPGST/WhfqPt/1BVVdY6UYhPwo5kKn/uxJ2+PrVen5hTKO7AC7AHtCbMaOPgPYY3kX0VIC2o6qrrJ8NgEeE+BFywaq85vtq0Bmj/t6kNn6Z/vsNfVrN9t7y9eDFAqFQqFQKBQKhYJbOn8DiOiPLaVp3CQAAAAASUVORK5CYII="
        ></image>
      </defs>
    </svg>
  );
}


export default Play;