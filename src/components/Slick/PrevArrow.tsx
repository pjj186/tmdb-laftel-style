interface PrevArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PrevArrow(props: PrevArrowProps) {
  return (
    <div
      className={props.className}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      <svg
        width='100%'
        height='100%'
        color='rgba(255, 255, 255, 0.6)'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.5}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5L8.25 12l7.5-7.5'
        />
      </svg>
    </div>
  );
}
