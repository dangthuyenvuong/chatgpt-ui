import parser from "@babel/parser";
import traverse from "@babel/traverse";
import fs from "fs";
import path from "path";
import prettier from "prettier";


/**
 * Parse a file and find the name of the default export.
 * @param {string} filePath - Path to the file.
 * @returns {string|null} - Name of the default export or null if not found.
 */
export function getDefaultExportName(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module", // Assume ES module syntax
    plugins: ["jsx", "typescript"], // Support for JSX and TypeScript
  });

  let exportName = null;

  traverse.default(ast, {
    ExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      if (declaration.type === "Identifier") {
        // export default someName;
        exportName = declaration.name;
      } else if (declaration.type === "FunctionDeclaration") {
        // export default function someName() {}
        exportName = declaration.id
          ? declaration.id.name
          : "Anonymous Function";
      } else if (declaration.type === "ClassDeclaration") {
        // export default class SomeClass {}
        exportName = declaration.id ? declaration.id.name : "Anonymous Class";
      }
    },
  });

  return exportName;
}

const appDir = "src/app";

export const log = {
  error: (msg) => console.error(`\x1b[31m${msg}\x1b[0m`),
  info: (msg) => console.log(`\x1b[32m${msg}\x1b[0m`),
};

// read all file page.tsx in src/app
export function getPageFiles(dir = appDir) {
  let results = [];
  const list = fs.readdirSync(dir);
  const layoutPath = path.join(dir, "layout.tsx");
  const layoutExists = fs.existsSync(layoutPath);
  const layoutHasExportDefault = layoutExists && hasExportDefault(layoutPath);
  const layoutName = layoutHasExportDefault
    ? getDefaultExportName(layoutPath)
    : null;

  let temp = results;

  if (layoutName) {
    let route = {
      url: getUrl(dir),
      path: dir.replace(appDir, "./app") + "/layout.tsx",
      layout: layoutName,
      children: [],
    };

    results.push(route);
    temp = route.children;
  }

  const pagePath = path.join(dir, "page.tsx");
  if (fs.existsSync(pagePath) && hasExportDefault(pagePath)) {
    let item = {
      url: getUrl(pagePath),
      path: pagePath.replace(appDir, "./app"),
      name: getDefaultExportName(pagePath),
    };

    let params = extractParams(pagePath);
    if (params.length > 0) {
      item.params = params;
    }

    if (layoutName) {
      item.index = true;
    }

    temp.push(item);
  }

  list.reverse().forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory() && file !== "components") {
      temp.push(...getPageFiles(filePath));
    }

    // else if (file === "page.tsx") {
    //   // Add file if it matches

    //   if (hasExportDefault(filePath)) {
    //     let item = {
    //       url: getUrl(filePath),
    //       path: filePath.replace(appDir, "./app"),
    //       name: getDefaultExportName(filePath),
    //     };

    //     let params = extractParams(filePath);
    //     if (params.length > 0) {
    //       item.params = params;
    //     }

    //     temp.push(item);
    //   } else {
    //     log.error(`${filePath} does not contain export default`);
    //   }
    // }
  });

  return results
}

/**
 * Check if a file contains 'export default'.
 * @param {string} filePath - The path to the file.
 * @returns {boolean} - True if 'export default' is found, otherwise false.
 */
export function hasExportDefault(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return content.includes("export default");
}

// [
//   '(auth)/forgot-password/page.tsx',
//   '(auth)/login/page.tsx',
//   '(auth)/register/page.tsx',
//   '(auth)/reset-password/page.tsx',
//   '(main)/[schema]/[action]/page.tsx',
//   '(main)/[schema]/page.tsx',
//   '(main)/dashboard/page.tsx',
//   '(main)/schema/[action]/page.tsx',
//   '(main)/schema/page.tsx',
//   'page.tsx'
// ]

/**
 * Extract params in square brackets from a path.
 * @param {string} path - The path string.
 * @returns {string[]} - Array of extracted params.
 */
function extractParams(path) {
  const regex = /\[([^\]]+)\]/g; // Match text inside square brackets
  const matches = [];
  let match;

  while ((match = regex.exec(path)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

export function getUrl(src) {
  let paths = src
    .replace(appDir, "")
    .replace(/(^\/|\/$)/gi, "")
    .replace(/page\.tsx$/, "")
    .split("/");
  let pathStr = "";
  paths.forEach((path) => {
    if (path.includes("(")) {
    } else if (path.includes("[")) {
      let params = extractParams(path);
      if (params[0]) {
        pathStr += `/:${params[0]}`;
      }
    } else {
      pathStr += `/${path}`;
    }
  });
  return pathStr.replace(/(^\/|\/$)/gi, "");
}

//--------------------------------
export function getLayoutFiles(dir = appDir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recursively search in subdirectories
      results = results.concat(getLayoutFiles(filePath));
    } else if (file === "layout.tsx") {
      // Add file if it matches

      if (hasExportDefault(filePath)) {
        let item = {
          url: getUrl(filePath),
          path: filePath,
          name: getDefaultExportName(filePath),
        };

        let params = extractParams(filePath);
        if (params.length > 0) {
          item.params = params;
        }

        results.push(item);
      } else {
        log.error(`${filePath} does not contain export default`);
      }
    }
  });

  return results;
}

export async function generateTemplate(templatePath, outputPath, dataReplace) {
  // Đọc nội dung file template
  const template = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholder ##ROUTE## với nội dung mới
  let updatedContent = template;
  for (let i in dataReplace) {
    updatedContent = updatedContent.replace(i, dataReplace[i]);
  }

  let formattedContent = updatedContent;

  try {
    formattedContent = await prettier.format(updatedContent, {
      parser: "typescript", // Parser phù hợp, ví dụ: typescript, babel, html
      semi: true,
      singleQuote: true,
      trailingComma: "all",
    });
  } catch (err) {
    console.log("Error format", err);
  }

  // Ghi vào file mới
  fs.writeFileSync(outputPath, formattedContent, "utf-8");
  // console.log(`File generated at: ${outputPath}`);
}
