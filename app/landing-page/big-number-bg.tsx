interface Props {
  index: number;
  position: 'right' | 'left';
}

export const BigNumberBg = ({ index, position }: Props) => {
  const bgNumPosition =
    position === 'left'
      ? 'md:left-[80%] lg:left-0'
      : 'md:right-[80%] lg:left-[-65%]';

  return (
    <div className={`absolute inset-0 ${bgNumPosition}`}>
      <span
        className={`absolute text-[70vw] sm:text-[15rem] font-regular
text-brand-primary-100 z-[-1] inset-0 flex items-center justify-center
md:text-[25rem] lg:text-[28rem] lg:items-center lg:justify-start select-none`}
      >
        {`0${index}`}
      </span>
    </div>
  );
};
