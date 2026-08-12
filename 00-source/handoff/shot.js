const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p = await b.newPage({viewport:{width:1440,height:1000}, deviceScaleFactor:2});
  const errs=[];
  p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
  p.on('console',m=>{ if(m.type()==='error') errs.push('CONSOLE: '+m.text()); });
  await p.goto('file://'+__dirname+'/unifyapps-manufacturing.html');
  await p.waitForTimeout(400);

  const shot = async (name)=>{ await p.screenshot({path:name, fullPage:true}); };

  // 1. Rowan default (decision pending)
  await shot('01-rowan.png');

  // 2. Accept option A -> loop fires
  await p.click('[data-act="accept"][data-o="A"]');
  await p.waitForTimeout(300);
  await shot('02-rowan-resolved.png');

  // 3. Sawyer - should show rebuilt sequence
  await p.click('[data-act="goto"][data-v="sawyer"]');
  await p.waitForTimeout(300);
  await shot('03-sawyer.png');

  // 4. Wren
  await p.click('[data-act="goto"][data-v="wren"]');
  await p.waitForTimeout(300);
  await shot('04-wren.png');

  // 5. Send finding -> rule into Sawyer
  await p.click('[data-act="finding"]');
  await p.waitForTimeout(300);
  await p.click('[data-act="grade"]');
  await p.waitForTimeout(250);
  await shot('05-wren-sent.png');

  // 6. back to Sawyer, rule should be present
  await p.click('[data-act="goto"][data-v="sawyer"]');
  await p.waitForTimeout(300);
  const ruleThere = await p.locator('.rule.fromloop').count();
  const movedRows = await p.locator('tr.moved').count();
  await shot('06-sawyer-with-rule.png');

  // 7. thresholds
  await p.click('[data-act="goto"][data-v="thresholds"]');
  await p.waitForTimeout(300);
  await shot('07-thresholds.png');

  const cleared = await p.locator('.needs.clear').count();

  console.log(JSON.stringify({errs, ruleThere, movedRows, clearedBanner:cleared},null,1));
  await b.close();
})();
