import { useRoutes } from "react-router";
import routes from "./Routes";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

function App() {
  useAxiosInterceptors();
  
  const routeResult = useRoutes(routes);
  return <>{routeResult}</>;
}

export default App;
