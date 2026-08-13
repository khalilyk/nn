/** Standalone login page served by the proxy when /pf isn't authenticated.
 *  Styled to match Pixelform (dark chrome + coral accent). */
export const PF_LOGIN_HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pixelform — Sign in</title>
<style>
  :root{--bg:#0C0C0E;--panel:#141416;--line:#232327;--ink:#F4F3F1;--muted:#8B8B90;--accent:#EE5340;
    --ui:"Helvetica Neue",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color-scheme:dark}
  *{box-sizing:border-box}
  body{margin:0;height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);font-family:var(--ui);padding:24px}
  .card{width:100%;max-width:340px;text-align:center}
  .wordmark{font-weight:700;letter-spacing:.34em;font-size:16px}
  .sub{color:var(--muted);font-size:12.5px;margin:10px 0 26px}
  form{display:flex;flex-direction:column;gap:12px}
  label{text-align:left;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-weight:600}
  input{height:46px;background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:0 14px;color:var(--ink);font-size:15px;width:100%}
  input:focus{outline:none;border-color:var(--accent)}
  button{height:46px;background:var(--accent);color:#fff;border:none;border-radius:9px;font-size:13px;letter-spacing:.14em;
    text-transform:uppercase;font-weight:700;cursor:pointer;margin-top:4px}
  button:hover{filter:brightness(1.07)}
  button:disabled{opacity:.6;cursor:default}
  .err{color:var(--accent);font-size:12.5px;min-height:16px;margin-top:2px}
  .foot{margin-top:26px;font-size:11px;color:#5E5E63}
</style></head>
<body>
  <div class="card">
    <div class="wordmark">PIXELFORM</div>
    <div class="sub">Enter the password to open the studio.</div>
    <form id="f">
      <div style="text-align:left"><label for="pw">Password</label></div>
      <input id="pw" type="password" autocomplete="current-password" autofocus placeholder="••••••••">
      <div class="err" id="err"></div>
      <button id="go" type="submit">Enter</button>
    </form>
    <div class="foot">Not Normal</div>
  </div>
<script>
  const f=document.getElementById('f'),pw=document.getElementById('pw'),err=document.getElementById('err'),go=document.getElementById('go');
  f.addEventListener('submit',async e=>{e.preventDefault();err.textContent='';go.disabled=true;go.textContent='…';
    try{
      const r=await fetch('/api/pf/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pw.value})});
      if(r.ok){location.replace('/pf');return;}
      err.textContent='Wrong password. Try again.';
    }catch(_){err.textContent='Something went wrong. Try again.';}
    go.disabled=false;go.textContent='Enter';pw.select();
  });
</script>
</body></html>`;
