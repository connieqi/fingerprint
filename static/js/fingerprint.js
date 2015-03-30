var getFingerprint = function() {
    var fp = {};
    fp.userAgent = navigator.userAgent;
    fp.cookiesEnabled = navigator.cookieEnabled;
    fp.language = navigator.language;
    fp.cpuClass = navigator.cpuClass;
    fp.platform = navigator.platform;
    fp.doNotTrack = navigator.doNotTrack;
    fp.screenResolution = screen.width + 'x' + screen.height;    // Computer screen, not browser window
    fp.screenColorDepth = screen.colorDepth;
    fp.timezoneOffset = new Date().getTimezoneOffset();
    fp.plugins = getPluginsString();
    fp.canvasFingerprint = getCanvasString();
    console.log(navigator);

    // getHTTPHeader(function(headers){
    //     console.log(headers);
    // });

    console.log(fp);
    return fp;
};

var getPluginsString = function() {
    var plugins = [];
    for (var i = 0; i < navigator.plugins.length; ++i) {
        var plugin = [];
        var p = navigator.plugins[i];
        plugin.push(p.filename);
        for (var j = 0; j < p.length; ++j) {
            plugin.push(p[j].type);
        }
        plugins.push(plugin.join(':'));
    };
    return plugins.join(',');
};

var getCanvasString = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // https://www.browserleaks.com/canvas#how-does-it-work
    var txt = 'Getting your canvas fingerprint..';
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    return canvas.toDataURL();
}

var getHTTPHeader = function(cb) {
    var req = new XMLHttpRequest();
    req.open('GET', document.location, true);
    req.onreadystatechange = receiveResponse;
    req.send();
    // var headers = req.getAllResponseHeaders().toLowerCase();
    // cb(headers);
};

function makeRequest(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = receiveResponse;
    xhr.send();
}
function receiveResponse(e)
{
    if (this.readyState == 4)
    {
        // xhr.readyState == 4, so we've received the complete server response
        if (this.status == 200)
        {
            // xhr.status == 200, so the response is good
            var response = this.responseXML;
            console.log(headers);
        }
    }
}

var displayFp = function(fp) {
    for (var key in fp) {
        var val = fp[key];
        $('#details').append('<tr class="details-row center"></tr>');
        $('.details-row:last').append('<td class="key">' + toCapitalized(key) + '</td>');
        $('.details-row:last').append('<td><div class="val">' + val + '</div></td>');
    }
}

var getHashedFp = function(fp) {
    fpArray = [];
    for (var key in fp) {
        fpArray.push(fp[key]);
    }
    return String(CryptoJS.SHA3(fpArray.join('#')));
}

function toCapitalized(name) {
    var words = name.match(/[A-Za-z][a-z]*/g);

    return words.map(capitalize).join(" ");
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

$(document).ready(function() {
    var fp = getFingerprint();
    displayFp(fp);
    var hashedFp = getHashedFp(fp);
    $('#fp').text(hashedFp);
});