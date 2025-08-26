import { Greet } from "@workspace/ui/components/common/greet";

export function HomePage() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center space-y-4">
      <h1 className="text-2xl font-bold mb-4">You are on the Home Page.</h1>
      <Greet />
    </div>
  );
}
