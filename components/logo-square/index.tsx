import Link from "next/link";

export default function LogoSquare({ classes }) {
  return (
    <Link href="/">
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 308.69 309.57"
        width="2em"
        height="4em"
      >
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path
              d="M213.22 38.51C210.17 37 173.59 22.78 162.38 23"
              fill="none"
              stroke="#88afb0"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={46}
            />
            <path
              d="M65.81 60.24c-14.1 12.82-21.28 21-32.41 46.33C4.34 172.76 38.65 249.89 105.68 277A130.9 130.9 0 00213.22 38.51"
              fill="none"
              stroke="#88afb0"
              strokeMiterlimit={10}
              strokeWidth={46}
            />
            <path
              d="M12.76 118.75a10.48 10.48 0 01-2.64-12.3C15 95.81 21.84 79.76 32.06 64 48.2 39.17 67.4 31.07 77.36 27.79 93 22.64 114 20.46 131.21 35c13.62 11.54 21.11 28.87 14.15 51.14l.48.4c19.48-12.33 42.8-10.78 62.88 6.23 15.77 13.36 22.27 30.89 22.09 47.57-.54 18.09-10.43 39.93-35.84 69.92-6.52 7.71-12.47 14.22-17.75 19.64a25.64 25.64 0 01-35.22 1.43zM91.91 125l6.77-8c14.91-17.59 15.95-30.45 5.91-39-9.08-7.69-19.93-5.55-31.28 7.85-6.1 7.19-8.84 11.4-10.56 14.4zm68.83 58.32c3-2.6 6.06-6.2 10.81-11.8 11.18-13.19 15-28.84.9-40.79-13.63-11.54-27.82-4-40.7 11.2l-8.3 9.8z"
              fill="#88afb0"
            />
          </g>
        </g>
      </svg>
    </Link>
  );
}
