import type { SVGProps } from '@/types/svg';
const SVGComponent = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    data-icon="ep:home-filled"
    className="iconify iconify--ep"
    {...props}
  >
    <path
      fill="currentColor"
      d="M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z"
    />
  </svg>
);
export default SVGComponent;
