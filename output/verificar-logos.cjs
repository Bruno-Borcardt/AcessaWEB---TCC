const {chromium}=require('C:/Users/Bruno/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage();
for(const width of [390,1440]){await page.setViewportSize({width,height:900});for(const file of ['index.html','analisar.html','salvos.html','tipografia.html']){
await page.goto(pathToFileURL(path.resolve(file)).href);await page.waitForTimeout(250);
const result=await page.locator('img.site-logo').evaluateAll(imgs=>imgs.map(i=>({loaded:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width})));
if(!result.length||result.some(r=>!r.loaded))throw new Error(file+' logo ausente');
console.log(width,file,JSON.stringify(result));
if(file==='index.html')await page.screenshot({path:path.resolve('output/logo-home-'+width+'.png')});
}}
await browser.close();})();
