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

const MOUNTAINS_HEIGHT = {
    "aconcagua": 7777,
    "monte-pissis": 7777,
    "cerro-bonete": 7777,
    "walther-penck": 7777,
    "huascaran": 7777,
    "nevado-ojos-del-salado": 7777,
    "pic-dorizaba": 7777,
    "popocatepetl": 7777,
    "mont-saint-elie": 7777,
    "mont-shasta": 7777,
    "mont-logan": 7777,
    "denali": 7777,
    "kilimanjaro": 7777,
    "mont-meru": 7777,
    "mont-kenya": 7777,
    "mont-stanley": 7777,
    "ras-dashan": 7777,
    "mont-elgon": 7777,
    "col-de-la-forclaz": 7777,
    "mont-blanc": 7777,
    "dome-du-gouter": 7777,
    "mont-maudit": 7777,
    "mont-blanc-du-tacul": 7777,
    "grandes-jorasses": 7777,
    "lhotse": 7777,
    "everest": 7777,
    "makalu": 7777,
    "cho-oyu": 7777,
    "kanchenjunga": 7777,
    "k2": 7777
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

        const roomID = WA.room.id
        const roomName = roomID.split("/").pop()

        if (WA.state.hasVariable('flagHeight')) {
            console.log("Summit map")
            // We are in a Summit map, ex: 'everest'
            //@ts-ignore
            WA.state.flagHeight = MOUNTAINS_HEIGHT[roomName]
            WA.state.mountain = roomName
        } else  if (WA.state.hasVariable('mountain')) {
            console.log("Cottage map")
           
            // We are in a Cottage map, ex: 'everest-cottage'
            const parts = roomName?.split("-")
            parts?.pop()
            WA.state.mountain = parts
        }

        WA.room.area.onEnter("flag").subscribe(() => {
            const button: ButtonDescriptor[] = [{
                label: "En savoir plus",
                className: "primary",
                callback: () => WA.nav.openCoWebSite(WA.state.flagWebsite as string),
            }]
            currentPopup = WA.ui.openPopup("flagPopup", `Vous êtes arrivé à ${WA.state.flagHeight} mètres d'altitude !`, button)
        })

        WA.room.area.onLeave("flag").subscribe(closePopup)
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
        currentPopup = WA.ui.openPopup(region+"_Popup", MOUNTAINS[region].join('\n'), [])
    })

    WA.room.area.onLeave(region).subscribe(closePopup)
}

const listenMountainSign = (mountain: string) => {
    WA.room.area.onEnter(mountain).subscribe(() => {
        const button: ButtonDescriptor[] = [{
            label: "Monter",
            className: "primary",
            callback: () => WA.nav.goToRoom("/@/sherpa/metavers/"+slugify(mountain)+"#from-agora"),
        }]
        currentPopup = WA.ui.openPopup(mountain+"_Popup", "Monter au sommet du "+mountain, button)
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
