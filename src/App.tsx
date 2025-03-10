import { useRoutes } from "react-router";
import routes from "./Routes";
import { GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

function App() {

  const routeResult = useRoutes(routes);
  return <>{routeResult}</>;
}

export default App;
