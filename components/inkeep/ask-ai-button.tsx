import { AISearchTrigger } from "@/components/inkeep/search";
import { Button } from "@/components/ui/button";

export const AskAIButton = () => {
  return (
    <AISearchTrigger asChild>
      <Button shortcutKey="a" size="small" className="max-w-[75px]">
        Ask AI
      </Button>
    </AISearchTrigger>
  );
};