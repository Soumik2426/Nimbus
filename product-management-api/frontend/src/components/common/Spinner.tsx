import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
}

function Spinner({
  size = 22,
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        size={size}
        className="animate-spin text-indigo-600"
      />
    </div>
  );
}

export default Spinner;