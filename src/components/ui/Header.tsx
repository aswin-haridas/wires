import { Plus } from "lucide-react";
import Button from "./Button";

interface HeaderProps {
  onAddConnection: () => void;
}

export default function Header({ onAddConnection }: HeaderProps) {
  return (
    <nav className="flex w-full items-center justify-between p-6 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-900">Wires</h1>
      <Button onClick={onAddConnection} icon={Plus}>
        Add Connection
      </Button>
    </nav>
  );
}
