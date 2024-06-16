import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface LoaderButtonProps {
  condition: string;
  onClick: () => void;
}
const LoaderButton = ({
  condition,
  onClick
}: LoaderButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        onClick()
      }}
    >
      {!isLoading ? "Go to lecture" : <Loader2 className="animate-spin" />}
    </Button>
  );
};

export default LoaderButton;
