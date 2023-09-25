import './Stepper.css';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex gap-16">
      {Array.from({ length: steps })
        .fill(0)
        .map((_, idx) => {
          const fill =
            idx + 1 <= currentStep ? 'step-circle-active' : 'step-circle';
          return (
            <div key={idx} className={`flex `}>
              <div className={fill}></div>
            </div>
          );
        })}
    </div>
  );
}
