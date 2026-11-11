import fs from 'node:fs/promises';
import ts from 'typescript';
export async function resolve(specifier,context,nextResolve){
  try{return await nextResolve(specifier,context);}catch(error){
    if(!specifier.startsWith('.') || !context.parentURL)throw error;
    for(const suffix of ['.ts','.tsx','/index.ts']){
      try{return await nextResolve(new URL(specifier+suffix,context.parentURL).href,context);}catch{}
    }
    throw error;
  }
}
export async function load(url,context,nextLoad){
  if(/\.tsx?$/.test(url)){
    const source=await fs.readFile(new URL(url),'utf8');
    const result=ts.transpileModule(source,{fileName:new URL(url).pathname,compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}});
    return {format:'module',shortCircuit:true,source:result.outputText};
  }
  return nextLoad(url,context);
}
