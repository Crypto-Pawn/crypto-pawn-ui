import { cn } from '@/libs/style.ts';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn('m-auto bg-transparent block w-8 h-8', className)}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <rect fill="#927331" x="15" y="15" width="30" height="30" rx="3" ry="3">
      <animate
        attributeName="x"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="-1.8333333333333333s"
      ></animate>
      <animate
        attributeName="y"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="-1.3333333333333333s"
      ></animate>
    </rect>
    <rect fill="#be9323" x="15" y="15" width="30" height="30" rx="3" ry="3">
      <animate
        attributeName="x"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="-1.1666666666666667s"
      ></animate>
      <animate
        attributeName="y"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="-0.6666666666666666s"
      ></animate>
    </rect>
    <rect fill="#fdc32f" x="15" y="15" width="30" height="30" rx="3" ry="3">
      <animate
        attributeName="x"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="-0.5s"
      ></animate>
      <animate
        attributeName="y"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
        values="15;55;55;55;55;15;15;15;15"
        begin="0s"
      ></animate>
    </rect>
  </svg>
);
