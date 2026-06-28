import fs from 'fs';
import vm from 'vm';
import { foldBuild, compute, economy, DATA, MUT } from './js/engine.js';

const repo = process.cwd();
const html = fs.readFileSync('./tools/PACT-CharGen-Webtool.html', 'utf8');
const match = html.match(/function buildToLiveLog\(b\)\{[\s\S]*?async function exportToLiveSheet\(\)\{/);
if (!match) throw new Error('buildToLiveLog not found');
const fnSrc = match[0].replace(/async function exportToLiveSheet\(\)\{/, '');

function liveBase() {
  return {
    name:'',budget:0,originClass:'Fighter',originClass2:'(none)',species:'Human',species2:'(none)',
    stats:{STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10},hd:1,profBonus:2,hardy:0,tough:0,saves:[],skills:[],expertise:[],toolExpertise:[],
    languages:1,tools:[],instruments:[],customProfs:[],weaponProf:{},masteries:[],armour:{},
    arts:[],lineage:'',racialSpells:[],extraClasses:0,unlockedClasses:[],features:[],traditions:[],subAbilities:[],freeSub:{},subSpellBundles:[],boons:[],innate:[],drawbacks:[],gold:0,
    attune:0,ki:0,sorcery:0,martiallyBound:'(none)',appearance:{},size:'Medium',houseRules:{boons:{},draws:{},disabled:{boons:[],draws:[]}}
  };
}

const context = { console, Date, DATA, compute, MUT, liveBase };
vm.createContext(context);
vm.runInContext(fnSrc + '\nthis.buildToLiveLog = buildToLiveLog;', context);
const buildToLiveLog = context.buildToLiveLog;

const imported = JSON.parse(fs.readFileSync('c:/Users/JohnChow/Downloads/Owain_Marsh-livesheet.json', 'utf8'));
const build = foldBuild(imported.LOG);
const log = buildToLiveLog(build);
const newBuild = foldBuild(log.LOG);
const before = compute(build).total;
const after = compute(newBuild).total;
const buys = log.LOG.filter((e) => e.type === 'buy');
const drawbackEvents = buys.filter((e) => e.cat === 'drawback' && e.payload && e.payload.v === 'Unwary');
const boonEvents = buys.filter((e) => e.cat === 'boon');
console.log(JSON.stringify({
  beforeTotal: before,
  afterTotal: after,
  economyBefore: economy(imported.LOG),
  economyAfter: economy(log.LOG),
  drawbackEvents: drawbackEvents.length,
  boonEvents: boonEvents.length,
  firstCats: buys.slice(0, 20).map((e) => e.cat),
  drawbackLabels: buys.filter((e) => e.cat === 'drawback').map((e) => e.label)
}, null, 2));
