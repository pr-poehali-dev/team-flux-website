import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const links = [
  { to: "/", label: "Главная" },
  { to: "/about", label: "О команде" },
  { to: "/roster", label: "Состав" },
  { to: "/achievements", label: "Достижения" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-flux-border bg-flux-dark/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-flux-red rounded flex items-center justify-center glow-red-sm">
            <span className="text-white font-bold font-oswald text-sm">TF</span>
          </div>
          <span className="font-oswald text-xl text-white tracking-widest group-hover:text-flux-red-glow transition-colors">
            TEAM FLUX
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-oswald text-sm tracking-widest transition-colors ${
                pathname === l.to
                  ? "text-flux-red-glow border-b-2 border-flux-red-glow pb-0.5"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-4 px-4 py-1.5 bg-flux-red hover:bg-flux-red-bright text-white font-oswald text-sm tracking-widest rounded transition-colors"
          >
            УПРАВЛЕНИЕ
          </Link>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-flux-card border-t border-flux-border px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`font-oswald text-sm tracking-widest ${
                pathname === l.to ? "text-flux-red-glow" : "text-gray-400"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="font-oswald text-sm tracking-widest text-flux-red-glow"
          >
            УПРАВЛЕНИЕ
          </Link>
        </div>
      )}
    </nav>
  );
}
