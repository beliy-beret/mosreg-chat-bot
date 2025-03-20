import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.9997 7.33301C13.8229 7.33301 13.6533 7.40325 13.5283 7.52827C13.4032 7.65329 13.333 7.82286 13.333 7.99967C13.3409 9.24836 12.9132 10.4607 12.1234 11.428C11.3337 12.3952 10.2314 13.0568 9.00632 13.2987C7.78127 13.5407 6.5102 13.3479 5.41201 12.7535C4.31383 12.1592 3.45728 11.2005 2.98989 10.0425C2.5225 8.88457 2.47354 7.59989 2.85142 6.40973C3.22931 5.21956 4.01039 4.19843 5.06014 3.52219C6.1099 2.84596 7.36261 2.55695 8.60252 2.70495C9.84243 2.85295 10.9919 3.42869 11.853 4.33301H10.253C10.0762 4.33301 9.90663 4.40325 9.78161 4.52827C9.65658 4.65329 9.58634 4.82286 9.58634 4.99967C9.58634 5.17649 9.65658 5.34605 9.78161 5.47108C9.90663 5.5961 10.0762 5.66634 10.253 5.66634H13.273C13.4498 5.66634 13.6194 5.5961 13.7444 5.47108C13.8694 5.34605 13.9397 5.17649 13.9397 4.99967V1.99967C13.9397 1.82286 13.8694 1.65329 13.7444 1.52827C13.6194 1.40325 13.4498 1.33301 13.273 1.33301C13.0962 1.33301 12.9266 1.40325 12.8016 1.52827C12.6766 1.65329 12.6063 1.82286 12.6063 1.99967V3.17967C11.4961 2.11838 10.0535 1.47298 8.52235 1.35256C6.9912 1.23214 5.46543 1.6441 4.20296 2.5188C2.94048 3.3935 2.01875 4.67728 1.59356 6.15313C1.16837 7.62899 1.26582 9.20639 1.86942 10.6187C2.47301 12.031 3.54574 13.1916 4.90627 13.9042C6.2668 14.6169 7.83168 14.8379 9.33637 14.53C10.8411 14.222 12.1933 13.404 13.1644 12.2141C14.1356 11.0243 14.6661 9.53556 14.6663 7.99967C14.6663 7.82286 14.5961 7.65329 14.4711 7.52827C14.3461 7.40325 14.1765 7.33301 13.9997 7.33301Z"
      fill="#FAFAFA"
    />
  </svg>
);

export { SvgComponent as Reload };
