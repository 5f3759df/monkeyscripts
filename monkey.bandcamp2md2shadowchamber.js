// ==UserScript==
// @name         bandcamp.com/album
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://*.bandcamp.com/album/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bandcamp.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const scurl = location.protocol + '//' + location.host + location.pathname;
    const scartist = document.querySelector('div#centerWrapper div#propOpenWrapper div.trackView.has-art div#name-section h3 span a');
    const scalbum = document.querySelector('div#name-section h2.trackTitle');
    const scdescription = document.querySelector('div#centerWrapper div#propOpenWrapper div.trackView div#trackInfo div#trackInfoInner div.tralbumData.tralbum-about');
    const sccreditsfull = document.querySelector('div#centerWrapper div#propOpenWrapper div.trackView div#trackInfo div#trackInfoInner div.tralbumData.tralbum-credits');
    let screleased = null;
    let sccredits = null;
    if(sccreditsfull){
        //alert('ok');
        screleased = sccreditsfull.textContent.trim().split('\n')[0].replace('released ','');
        sccredits = sccreditsfull.textContent.trim().split('\n').slice(1).join(' ').trim().replace(/\s+/g, ' ');
    }
    const sctagsarray = [...document.querySelectorAll('div.trackView div.tralbumData.tralbum-tags a.tag')];

    const description = `${(scalbum ? `### Album: ${scalbum.textContent.trim()}`:'')}
${(scartist ? `### Artist: ${scartist.textContent.trim().replace(/by /i,'')}`:'')}
---

${(scurl ? `**URL:** *[${scurl}](${scurl})*`:'')}

${(screleased ? `**Released:** *${screleased}*`: '')}

${(sccredits ? `**Credits:**
    *${sccredits}*`:'')}

${(sctagsarray ? `**Tags:** *${[[...sctagsarray].map(x=>{return x.textContent.trim()})][0].join(', ')}*`: '')}

${(scdescription ? `**Description:**
${scdescription.textContent.trim()}`:'')}
`;

    document.querySelector('body').addEventListener('click', e =>{
        console.log(description);
        navigator.clipboard.writeText(description)
            .then(() => { console.log('ok');},
                  (err) => { console.log('error: ',err);
        });
    });
})();