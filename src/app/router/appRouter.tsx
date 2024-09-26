import { Route, Routes } from "react-router-dom";
import { SuspenseLayout } from "@/shared/ui/layouts";
import { RouteDescription, RouteNames } from "@/shared/config/routes";
import { NotFoundPage } from "@/pages/notFoundPage/ui";
import { LoginPage } from "@/pages/login/ui";
import { HomePage } from "@/pages/home/ui/HomePage.tsx";

const { LOGIN, HOME } = RouteNames;

const routes: RouteDescription[] = [
  {
    path: LOGIN,
    component: LoginPage,
  },
  {
    path: HOME,
    component: HomePage,
  },
];

const routesContent = routes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
));

export const AppRouter = () => {
  return (
    <SuspenseLayout>
      <Routes>
        {routesContent}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SuspenseLayout>
  );
};
