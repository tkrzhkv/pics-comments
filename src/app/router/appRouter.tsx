import { Route, Routes } from "react-router-dom";
import { SuspenseLayout } from "@/shared/ui/layouts";
import { RouteDescription, RouteNames } from "@/shared/config/routes";
import { NotFoundPage } from "@/pages/notFoundPage/ui";
import { LoginPage } from "@/pages/login/ui";
import { HomePage } from "@/pages/home/ui";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Routes>
          {routesContent}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </SuspenseLayout>
  );
};
