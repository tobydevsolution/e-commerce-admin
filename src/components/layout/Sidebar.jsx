import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";

function Sidebar() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/products", label: "Products", icon: Package },
    { path: "/orders", label: "Orders", icon: ShoppingCart },
    { path: "/customers", label: "Customers", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 pt-7 pb-2 flex justify-between items-center border-b border-gray-700">
        <Link
          to="/"
          className={`overflow-hidden transition-all ${
            isExpanded ? "w-32" : "w-0"
          }`}
        >
          <span className="text-2xl text-center font-bold text-indigo-300 whitespace-nowrap">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          {isExpanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 mt-5">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-700 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span
                  className={`ml-3 overflow-hidden transition-all ${
                    isExpanded ? "w-52" : "w-0"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 p-3">
        <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              isExpanded ? "w-52" : "w-0"
            }`}
          >
            Logout
          </span>
        </button>
      </div>

      <div
        className={`p-4 pt-2 border-t border-gray-700 text-sm text-gray-400 text-center overflow-hidden transition-all ${
          isExpanded ? "w-full" : "w-0 hidden"
        }`}
      >
        &copy; {new Date().getFullYear()} E-commerce Admin
      </div>
    </aside>
  );
}

export default Sidebar;
