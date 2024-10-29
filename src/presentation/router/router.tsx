import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  ProblemSolverPage,
  // TheoryHelperPage,
  // PlotVisualizationPage,
  // InteractiveExercisesPage,
  // FollowUpPage,
  AssistantPage,
} from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
  {
    to: "/problemsolver",
    icon: "fa-solid fa-book-open-reader",
    title: "Tutor",
    description: "Apoyo personalizado para mejorar las habilidades matemáticas",
    component: <ProblemSolverPage />,
  },
  // {
  //   to: "/theoryhelper",
  //   icon: "fa-solid fa-code-compare",
  //   title: "Ayuda con conceptos",
  //   description: "Ayuda sobre teoremas, fórmulas y sus aplicaciones",
  //   component: <TheoryHelperPage />,
  // },
  // {
  //   to: "/plotvisualization",
  //   icon: "fa-solid fa-water",
  //   title: "Gráficos y visualización",
  //   description: "Apoyo para graficar funciones matemáticas",
  //   component: <PlotVisualizationPage />,
  // },
  // {
  //   to: "/interactiveexercises",
  //   icon: "fa-solid fa-language",
  //   title: "Ejercicios interactivos",
  //   description: "Ejercicios interactivos para practicar",
  //   component: <InteractiveExercisesPage />,
  // },
  // {
  //   to: "/followup",
  //   icon: "fa-solid fa-podcast",
  //   title: "Historial y Seguimiento",
  //   description: "Muestra el progreso del usuario en diferentes áreas y temas",
  //   component: <FollowUpPage />,
  // },
  {
     to: "/assistant",
     icon: "fa-solid fa-user",
     title: "Asistente",
     description: "Apoyo personalizado para mejorar las habilidades matemáticas",
     component: <AssistantPage />,
   },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
