// vite.config.js
import { defineConfig } from "file:///C:/Users/ThinkPad/Desktop/truthgate-social-media-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ThinkPad/Desktop/truthgate-social-media-app/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" }
    ]
  },
  // ...
  server: {
    port: 3e3,
    proxy: {
      "/api": { target: "https://truthgate-backend.vercel.app" },
      https: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUaGlua1BhZFxcXFxEZXNrdG9wXFxcXHRydXRoZ2F0ZS1zb2NpYWwtbWVkaWEtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUaGlua1BhZFxcXFxEZXNrdG9wXFxcXHRydXRoZ2F0ZS1zb2NpYWwtbWVkaWEtYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9UaGlua1BhZC9EZXNrdG9wL3RydXRoZ2F0ZS1zb2NpYWwtbWVkaWEtYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSBdLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnL3NyYycgfVxuICAgIF0sXG4gIH0sXG4gIC8vIC4uLlxuXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7IHRhcmdldDogXCJodHRwczovL3RydXRoZ2F0ZS1iYWNrZW5kLnZlcmNlbC5hcHBcIiB9LFxuICAgICAgaHR0cHM6IHRydWVcbiAgICB9XG4gIH0sXG5cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdWLFNBQVMsb0JBQW9CO0FBQ3JYLE9BQU8sV0FBVztBQUlsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFFO0FBQUEsRUFFbEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLEtBQUssYUFBYSxPQUFPO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVEsRUFBRSxRQUFRLHVDQUF1QztBQUFBLE1BQ3pELE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
