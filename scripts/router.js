import chokidar from "chokidar";
import { generateTemplate, getLayoutFiles, getPageFiles } from "./utils.js";
import path from "path";
import fs from "fs";
import prettier from "prettier";

function generateRouter(pages) {
  let routeContent = "";
  pages.forEach((page, index) => {
    if (page.layout) {
      routeContent += ` 
      {
      path: "/${page.url}",
      element: <${page.layout}><Outlet /></${page.layout}>,
      children: [
      ${
        page.name
          ? `{
        path: PATH.${page.name},
        element: <${page.name} />
      },`
          : ""
      }
      
      ${generateRouter(page.children)}
      
      ]
    },
      `;
    } else {
      routeContent += `{
        path: PATH.${page.name},
        element: <${page.name} />,
        ${page.index ? "index: true," : ""}
      },
      `;
    }
  });

  return routeContent;
}

function generateLazyImport(pages) {
  let lazyImportContent = "";
  pages.forEach((page, index) => {
    if (page.layout) {
      lazyImportContent += `const ${page.layout} = lazy(() => import("${page.path}"));`;
    } else if (page.name) {
      lazyImportContent += `const ${page.name} = lazy(() => import("${page.path}"));`;
    }
    if (page.children) {
      lazyImportContent += generateLazyImport(page.children);
    }
  });
  return lazyImportContent;
}

function generateTypescript(pages) {
  let typescriptContent = "";
  pages.forEach((page, index) => {
    if (page.params) {
      typescriptContent += `
        export type ${page.name}Params = {
          ${page.params.map((param) => `${param}: string`).join(";\n")}
        };
      `;
    }
    if (page.children) {
      typescriptContent += generateTypescript(page.children);
    }
  });
  return typescriptContent;
}

function generatePathTemplate(pages) {
  let pathContent = "";
  pages.forEach((page) => {
    if (page.name) {
      pathContent += `
        ${page.name}: "/${page.url}",
      `;
    }
    if (page.children) {
      pathContent += generatePathTemplate(page.children);
    }
  });
  return pathContent;
}

// Watch the src directory for changes to js, jsx, ts, tsx files
chokidar
  .watch("src/app/.", {
    persistent: true,
    ignored: (path, stats) =>
      stats?.isFile() &&
      !path.endsWith("page.tsx") &&
      !path.endsWith("layout.tsx"),
  })
  .on("change", () => {
    const pages = getPageFiles();
    // const layouts = getLayoutFiles();
    // Example usage:
    const templatePath = path.resolve("./scripts/template/router.template.tsx"); // Đường dẫn file template
    const outputPath = path.resolve("./src/router.tsx"); // Đường dẫn file đầu ra

    let routeContent = generateRouter(pages);
    let lazyImportContent = generateLazyImport(pages);
    let typescriptContent = generateTypescript(pages);
    let pathContent = generatePathTemplate(pages);

    generateTemplate(templatePath, outputPath, {
      "##ROUTER##": routeContent,
      "##LAZY_IMPORT##": lazyImportContent,
      "##TYPESCRIPT##": typescriptContent,
      "##PATH##": `export const PATH = {${pathContent}}`,
    });
  });
