import { useRoutes } from "react-router";
import routes from "./Routes";

function App() {
  const routeResult = useRoutes(routes);
  return <>{routeResult}</>;
}

export default App;
