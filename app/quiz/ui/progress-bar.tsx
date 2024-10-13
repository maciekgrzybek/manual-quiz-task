interface Props {
  step: number;
  max: number;
}

export const ProgressBar = ({ step, max }: Props) => {
  const progress = Math.round(((step + 1) / max) * 100);

  return (
    <div className="w-full bg-gray-200 mb-8 h-1.5">
      <div
        className="bg-brand-primary-500 h-1.5 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
