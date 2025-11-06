import './style.css';
import { selectorExtractor } from './core/calc/SelectorExtractor';
import { AdventureHub } from './ui/pages/AdventureHub';
import { Settings } from './ui/pages/Settings';
import { scannerNode } from './core/calc/ScanNode';

selectorExtractor.extract([
  AdventureHub,
  Settings
])
scannerNode.scan(document.querySelector('body'))
// console.log(scannerNode.get())




























// import { bestiaries } from "./database/bestiaries";
// import { Character } from "./core/models/Character";
// import { Battle } from './core/calc/Battle';
// import { Tray } from './ui/pages/Tray';

// const battle = new Battle([
//   new Character(structuredClone(bestiaries[0])),
//   new Character(structuredClone(bestiaries[1])),
//   new Character(structuredClone(bestiaries[0])),
// ], [
//   new Character(structuredClone(bestiaries[2])),
//   new Character(structuredClone(bestiaries[3])),
//   new Character(structuredClone(bestiaries[4])),
// ]);

// const tray = new Tray(battle.getLeftCharacters(), battle.getRightCharacters());
// tray.initialize()

// battle.launch();