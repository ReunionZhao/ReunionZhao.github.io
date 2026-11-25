// In-site PDF viewer: renders every page with PDF.js inside the site's own layout.
const PDFJS='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/';

const params=new URLSearchParams(location.search);
const file=params.get('file')||'';
const title=params.get('title')||'Document';
const status=document.getElementById('doc-status');
const pages=document.getElementById('doc-pages');

// Only files that live in this site's files/ folder may be shown.
const safe=/^files\/[A-Za-z0-9._-]+\.pdf$/.test(file);
document.getElementById('doc-title').textContent=title;
document.title=title+' | Runping Zhao';
if(document.referrer&&new URL(document.referrer).origin===location.origin){
  document.getElementById('doc-back').href=document.referrer;
}

async function render(){
  if(!safe){status.textContent='This document could not be found.';return;}
  document.getElementById('doc-download').href=file;
  try{
    const pdfjsLib=await import(PDFJS+'pdf.min.mjs');
    pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS+'pdf.worker.min.mjs';
    const pdf=await pdfjsLib.getDocument(file).promise;
    status.textContent='';
    const width=Math.min(pages.clientWidth||900,900);
    const ratio=window.devicePixelRatio||1;
    for(let n=1;n<=pdf.numPages;n++){
      const page=await pdf.getPage(n);
      const base=page.getViewport({scale:1});
      const vp=page.getViewport({scale:(width/base.width)*ratio});
      const canvas=document.createElement('canvas');
      canvas.width=vp.width;canvas.height=vp.height;
      canvas.style.width=width+'px';
      canvas.setAttribute('aria-label',title+', page '+n);
      pages.appendChild(canvas);
      await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
    }
  }catch(err){
    // Fallback: the browser's own PDF reader, still inside this page.
    status.textContent='';
    const frame=document.createElement('iframe');
    frame.src=file;frame.title=title;
    frame.style.cssText='width:100%;height:85vh;border:0';
    pages.appendChild(frame);
  }
}
render();
