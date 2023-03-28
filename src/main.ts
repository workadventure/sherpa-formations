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
    "aconcagua": 6962,
    "monte-pissis": 6792,
    "cerro-bonete": 6759,
    "walther-penck": 6658,
    "huascaran": 6768,
    "nevado-ojos-del-salado": 6893,
    "pic-dorizaba": 5675,
    "popocatepetl": 5465,
    "mont-saint-elie": 5489,
    "mont-shasta": 4322,
    "mont-logan": 5956,
    "denali": 6190,
    "kilimanjaro": 5892,
    "mont-meru": 4565,
    "mont-kenya": 5199,
    "mont-stanley": 5109,
    "ras-dashan": 4550,
    "mont-elgon": 4321,
    "col-de-la-forclaz": 1147,
    "mont-blanc": 4807,
    "dome-du-gouter": 4304,
    "mont-maudit": 4465,
    "mont-blanc-du-tacul": 4248,
    "grandes-jorasses": 4208,
    "lhotse": 8516,
    "everest": 8848,
    "makalu": 8485,
    "cho-oyu": 8188,
    "kanchenjunga": 8586,
    "k2": 8611
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

    WA.room.area.onEnter("Cottage_Sign").subscribe(() => {
        currentPopup = WA.ui.openPopup("Cottage_Sign_Popup", "Entrez dans le chalet pour suivre votre formation.", [])
    })

    WA.room.area.onLeave("Cottage_Sign").subscribe(closePopup)

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
            let parts = roomName?.split("-")
            parts?.pop()
            WA.state.mountain = parts?.join("-")
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
