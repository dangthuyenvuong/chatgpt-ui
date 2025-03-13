import { useRoutes } from "react-router-dom";
import { router } from "./router";
// import "@/ui/_/extension";
// import "@/ui/assets/css/global.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Kích hoạt plugin
dayjs.extend(relativeTime);

function App() {
  const element = useRoutes(router);

  return <>{element}</>;
}

export default App;
