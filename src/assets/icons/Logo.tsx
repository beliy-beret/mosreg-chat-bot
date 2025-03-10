import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={36} height={36} rx={4} fill="#1B4DCB" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6481 16.7893H16.6828L22.4356 7H14.8114C14.4302 7 14.0836 7.10377 13.7371 7.27673C13.4252 7.44969 13.1479 7.72642 12.94 8.03774L5.45448 20.5943C5.24654 20.9403 5.14258 21.3208 5.14258 21.7358C5.14258 22.1509 5.2812 22.5314 5.48913 22.8774L9.50914 29L16.6481 16.7893ZM17.9998 19.1761L12.2471 29H23.7526L17.9998 19.1761ZM30.8566 21.7358C30.8566 22.1509 30.718 22.5314 30.5101 22.8773L26.4901 28.9654L19.3857 16.8239L23.787 9.31757L30.5447 20.5943C30.7527 20.9402 30.8566 21.3207 30.8566 21.7358Z"
      fill="white"
    />
  </svg>
);
export { SvgComponent as Logo };
