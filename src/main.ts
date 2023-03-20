/// <reference types="@workadventure/iframe-api-typings" />

import { ButtonDescriptor } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
const MOUNTAINS = {
    "SA": ["Aconcágua", "Monte Pissis", "Cerro Bonete", "Walther Penck", "Huascarán", "Nevado Ojos del Salado"],
    "NA": ["Pic d'Orizaba", "Popocatépetl", "Mont Saint-Élie", "Mont Shasta", "Mont Logan", "Denali"],
    "AF": ["Kilimanjaro", "Mont Méru", "Mont Kenya", "Mont Stanley", "Ras Dashan", "Mont Elgon"],
    "FR": ["Col de la Forclaz", "Mont Blanc", "Dôme du Goûter", "Mont Maudit", "Mont Blanc du Tacul", "Grandes Jorasses"],
    "AS": ["Lhotse", "Everest", "Makalu", "Cho Oyu", "Kanchenjunga", "K2"]
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    listenRegionSign("SA")
    listenRegionSign("NA")
    listenRegionSign("AF")
    listenRegionSign("FR")
    listenRegionSign("AS")

    for(let mountain of MOUNTAINS.SA) {
        listenMountainSign(mountain)
    }
    for(let mountain of MOUNTAINS.NA) {
        listenMountainSign(mountain)
    }
    for(let mountain of MOUNTAINS.AF) {
        listenMountainSign(mountain)
    }
    for(let mountain of MOUNTAINS.FR) {
        listenMountainSign(mountain)
    }
    for(let mountain of MOUNTAINS.AS) {
        listenMountainSign(mountain)
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const closePopup = () => {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

const listenRegionSign = (region: string) => {
    WA.room.area.onEnter(region).subscribe(() => {
        //@ts-ignore
        currentPopup = WA.ui.openPopup(region+"_Popup", MOUNTAINS[region].join('\n'), []);
    })

    WA.room.area.onLeave(region).subscribe(closePopup)
}

const listenMountainSign = (mountain: string) => {
    console.log(slugify(mountain))
    WA.room.area.onEnter(mountain).subscribe(() => {
        const button: ButtonDescriptor[] = [{
            label: "Monter",
            className: "primary",
            callback: () => WA.nav.goToRoom("/@/sherpa/metavers/"+slugify(mountain)),
        }]
        currentPopup = WA.ui.openPopup(mountain+"_Popup", "Monter au sommet du "+mountain, button);
    })

    WA.room.area.onLeave(mountain).subscribe(closePopup)
}

const slugify = (string: string) => {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

export {};
