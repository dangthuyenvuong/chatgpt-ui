import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import { spawn } from "child_process";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

function watchRouter(): PluginOption {
  return {
    name: "auto-router",
    configureServer() {
      // Chạy lệnh watch khi server khởi động
      const watcherProcess = spawn("nodemon", ["scripts/router.js"], {
        stdio: "inherit", // Kế thừa output từ script
      });

      // Đảm bảo tắt watcher khi server ngừng
      process.on("exit", () => watcherProcess.kill());
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), watchRouter(), tailwindcss()],
});
