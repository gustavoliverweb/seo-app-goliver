declare module "pdfjs-dist/build/pdf.min.mjs" {
  export function getDocument(src: string): Promise<any>;
  export function GlobalWorkerOptions(options: any): void;
  export const version: string;
}

// declare module "*.ttf" {
//   const value: any;
//   export default value;
// }
