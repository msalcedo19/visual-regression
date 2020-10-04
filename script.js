function randomPalette(qty, degree){

    let colors = []
    let huedelta = Math.trunc(360 / qty)

    for (let i = 0; i < qty; i++) {
        let hue = (i * huedelta) + degree

        if(hue > 359){
            hue = hue - 359;
        }

        colors.push(`hsl(${hue},${100}%,${50}%)`)
    }

    return colors
}

function generateRules(){
    let n = Math.ceil(Math.random() * (359));
    let colors = randomPalette(5, n);

    document.getElementById('color1').style.backgroundColor = colors[0];
    document.getElementById('color2').style.backgroundColor = colors[1];
    document.getElementById('color3').style.backgroundColor = colors[2];
    document.getElementById('color4').style.backgroundColor = colors[3];
    document.getElementById('color5').style.backgroundColor = colors[4];

    document.getElementById('css-rules').value = '.website-background{ color: '+colors[0]+';}\n' +
        '\n' +
        '.element-text{ color: '+colors[1]+';}\n' +
        '\n' +
        '.element-border{ border-color: '+colors[2]+';}\n' +
        '\n' +
        '.element-background{ background-color: '+colors[3]+';}\n' +
        '\n' +
        '.header{ color: '+colors[4]+';}';
}

function cleanPalette(){
    let colors = ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]

    document.getElementById('color1').style.backgroundColor = colors[0];
    document.getElementById('color2').style.backgroundColor = colors[1];
    document.getElementById('color3').style.backgroundColor = colors[2];
    document.getElementById('color4').style.backgroundColor = colors[3];
    document.getElementById('color5').style.backgroundColor = colors[4];

    document.getElementById('css-rules').value = '.website-background{ color: '+colors[0]+';}\n' +
        '\n' +
        '.element-text{ color: '+colors[1]+';}\n' +
        '\n' +
        '.element-border{ border-color: '+colors[2]+';}\n' +
        '\n' +
        '.element-background{ background-color: '+colors[3]+';}\n' +
        '\n' +
        '.header{ color: '+colors[4]+';}';
}

