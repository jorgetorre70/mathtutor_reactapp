// import { NavLink } from "react-router-dom";

// interface Props {
//   to: string;
//   icon: string;
//   title: string;
//   description: string;
// }

// export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         isActive
//           ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
//           : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
//       }
//     >
//       <i className={`${icon} text-2xl mr-4 text-yellow-600`} />
//       {/* <i className={`${icon} text-2xl mr-4 text-indigo-400`} /> */}
//       <div className="flex flex-col flex-grow">
//         <span className="text-white text-lg font-semibold">{title}</span>
//         <span className="text-gray-400 text-sm">{description}</span>
//       </div>
//     </NavLink>
//   );
// };
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center 
        w-full
        px-3 py-2.5 sm:py-3
        mb-2 
        rounded-lg 
        transition-all duration-200
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
        }
      `}
    >
      {({ isActive }) => (
        <>
          {/* Icon Container - Responsive sizing */}
          <div className="flex-shrink-0">
            <i
              className={`
              ${icon} 
              text-xl sm:text-2xl 
              text-yellow-600
              transition-transform duration-200 
              group-hover:scale-110
            `}
            />
          </div>

          {/* Text Content Container - Responsive text and spacing */}
          <div className="ml-3 sm:ml-4 flex-1 min-w-0">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-semibold truncate">
                {title}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 truncate">
                {description}
              </span>
            </div>
          </div>

          {/* Active Indicator */}
          <div
            className={`
            ml-2 flex-shrink-0
            transition-opacity duration-200
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
          >
            <i className="fas fa-circle text-xs sm:text-sm text-yellow-600" />
          </div>
        </>
      )}
    </NavLink>
  );
};

// Optional: Add loading state version
export const SidebarMenuItemSkeleton = () => {
  return (
    <div className="flex items-center w-full px-3 py-2.5 sm:py-3 mb-2 rounded-lg">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg animate-pulse" />
      <div className="ml-3 sm:ml-4 flex-1">
        <div className="h-5 sm:h-6 bg-gray-700 rounded w-24 animate-pulse" />
        <div className="h-4 sm:h-5 bg-gray-700 rounded w-32 mt-1 animate-pulse" />
      </div>
    </div>
  );
};
