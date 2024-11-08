// import { Outlet } from "react-router-dom";
// import { signOut } from "aws-amplify/auth"; // Updated import
// import { menuRoutes } from "../router/router";
// import { SidebarMenuItem } from "../components";

// export const DashboardLayout = () => {
//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       // The Authenticator component will handle the redirect
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <main className="flex flex-row mt-7">
//       <nav className="relative hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl items-center">
//         <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
//           MathTutor<span className="text-indigo-500">.</span>
//         </h1>
//         <span className="text-l">El asistente para matemáticas</span>
//         <div className="border-gray-700 border my-3" />
//         {/* Opciones del menú */}
//         {menuRoutes.map((option) => (
//           <SidebarMenuItem key={option.to} {...option} />
//         ))}

//         {/* Logout Button Above Copyright */}
//         <div className="absolute bottom-12 w-full flex justify-center">
//           <button
//             onClick={handleSignOut}
//             className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 ease-in-out"
//           >
//             <i className="fa-solid fa-sign-out-alt" />
//             Cerrar Sesión
//           </button>
//         </div>

//         <div className="absolute bottom-0 w-full flex items-center">
//           <span className="text-xs ml-2">
//             Derechos Reservados &copy; 2024 J.T.R.
//           </span>
//         </div>
//       </nav>

//       <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
//         <div className="flex flex-row h-full">
//           <div className="flex flex-col flex-auto h-full p-1">
//             <Outlet />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-indigo-600 text-white sm:hidden hover:bg-indigo-700 transition-colors"
        aria-label="Toggle menu"
      >
        <i
          className={`fas fa-${isMobileMenuOpen ? "times" : "bars"} w-6 h-6`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto pt-16 sm:pt-7 px-4 sm:px-6 lg:px-8">
        {/* Sidebar Navigation */}
        <nav
          className={`
          fixed sm:relative
          inset-y-0 left-0
          transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
          transition-transform duration-300 ease-in-out
          w-64 sm:w-[370px]
          bg-white bg-opacity-10
          p-5 sm:ml-5
          rounded-r-3xl sm:rounded-3xl
          flex flex-col
          z-40 sm:z-auto
        `}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl sm:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
              MathTutor<span className="text-indigo-500">.</span>
            </h1>
            <span className="text-sm sm:text-base">
              El asistente para matemáticas
            </span>
          </div>

          <div className="w-full border-t border-gray-700 my-4" />

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            {menuRoutes.map((option) => (
              <div key={option.to} onClick={() => setIsMobileMenuOpen(false)}>
                <SidebarMenuItem {...option} />
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pt-6">
            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                       bg-red-500 hover:bg-red-600 
                       text-white rounded-lg 
                       transition-all duration-200 ease-in-out
                       text-sm sm:text-base"
            >
              <i className="fa-solid fa-sign-out-alt" />
              Cerrar Sesión
            </button>

            {/* Copyright */}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">
                Derechos Reservados &copy; 2024 J.T.R.
              </span>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <section
          className="flex-1 min-h-[calc(100vh-theme(spacing.16))] sm:min-h-[calc(100vh-theme(spacing.7))]
                          bg-white bg-opacity-10 
                          rounded-3xl p-4 sm:p-5
                          ml-0 sm:ml-6
                          mt-4 sm:mt-0"
        >
          <div className="h-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};
