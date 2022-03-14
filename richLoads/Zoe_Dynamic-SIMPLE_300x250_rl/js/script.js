
function ftInit() {
    myFT.on("instantads", function (e) {
        preload();
    });
}

function preload() {
    var heightOffset = 0
    // console.log(checkPlatform());
    //if(navigator.userAgent.toLowerCase().indexOf('safari') == -1) {//ie and firefox
    if(checkPlatform()[1] == 'firefox' || checkPlatform()[1] == 'safari') {
        console.log(myFT.getSize());
        // console.log()
        heightOffset = -4;
    }
    var variables = myFT.instantAds;
    
    //load images
    var imageCount = 3, imageLoaded = 0;

    background.src = variables.background_img;
    background.addEventListener("load", iLoad, false);

    product.src = variables.product_img;
    product.addEventListener("load", iLoad, false);

    logo.src = 'images/logo_300x250.png';
    logo.addEventListener("load", iLoad, false);

    function iLoad() {
        imageLoaded++;
        if(imageLoaded == imageCount) {
            start();
        }
    }

    //set html
    headline.innerHTML = variables.productName_txt;
    setAttributes(headline, variables.productNameTxt_size_hex);

    description.innerHTML = variables.productDescription_txt;
    setAttributes(description, variables.productDescriptionTxt_size_hex);

    if(variables.cta_txt) {
        var ctaText = variables.cta_txt;
        var arrowIndex = ctaText.indexOf('>');
        if(arrowIndex != -1) {
            ctaText = ctaText.substring(0, arrowIndex) + '<span class="arrow">></span>';
        }
        cta.innerHTML = ctaText;
        setAttributes(cta, variables.ctaTxt_size_hex);
        cta.style.backgroundColor = variables.ctaBtn_hex;
    
        //resize text
        var width = overlay.offsetWidth;
        var ctaWidth = cta.offsetWidth;
        var ctaFont = getValue(cta, 'fontSize');

        while(ctaWidth + 5 > width) {
            ctaFont -= 1;
            if(ctaFont <= 5) break;
            cta.style.fontSize = ctaFont + 'px';
            var ctaWidth = cta.offsetWidth;
        }

        var ctaX = (width - cta.offsetWidth) / 2;
        cta.style.left = ctaX + 'px';
    } else {
        cta.style.visibility = 'none';
    }

    //reposition text
    var logoHeight = getValue(logospace, 'marginTop');    
    var totalHeight = logoHeight + headline.offsetHeight + description.offsetHeight;
    var ctaY = getValue(cta, 'top');

    while(totalHeight + 12 + heightOffset > ctaY) {
        logoHeight -= 1;
        if(logoHeight <= 60) break;
        logospace.style.marginTop = logoHeight + 'px';
        totalHeight = logoHeight + headline.offsetHeight + description.offsetHeight;   
    }

    //cta clicktag
    myFT.applyClickTag(product, 1, variables.clickTag1_url);
}

function setAttributes(element, attributes) {//set attributes when available
    if(!attributes) return;

    attributeList = attributes.split('|');
    if(attributeList[0]) element.style.fontSize = attributeList[0] + 'px';
    if(attributeList[1]) element.style.color = attributeList[1];
    return attributeList;
}

function getValue(element, valueType) {//get style value of valuetype
    var valueText = window.getComputedStyle(element)[valueType];
    return parseInt(valueText.substring(0, valueText.length - 2));
}

// ---------------------ANIMATIONS

function start() {
    var tl = new TimelineMax();
    tl.to('#main', .5, {autoAlpha: 1, delay: .5});
    tl.to('.fade2', .5, {autoAlpha: 1, delay: .5});
    tl.to('.fade3', .5, {autoAlpha: 1, delay: .5});
}

function checkPlatform() {
        try {
            var a = new Array();
    
            if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
                a[0] = "macOS";
            } else if (navigator.platform.toLowerCase().indexOf("win") > -1) {
                a[0] = "windows";
            } else {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    a[0] = "iOS";
                } else if (navigator.userAgent.match(/Opera Mini/i)) {
                    a[0] = "opera";
                } else if (navigator.userAgent.match(/Android/i)) {
                    a[0] = "android";
                } else if (navigator.userAgent.match(/BlackBerry/i)) {
                    a[0] = "BlackBerry";
                } else if (navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)) {
                    a[0] = "WindowsPhone";
                }
            }
    
            var MSIE = window.navigator.userAgent.indexOf("MSIE ");
            var Edge = window.navigator.userAgent.indexOf("Edge/");
            var Trdt = window.navigator.userAgent.indexOf("Trident/");
    
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                a[1] = "chrome";
            } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                a[1] = "firefox";
            } else if (navigator.vendor && navigator.vendor.toLowerCase().indexOf("apple") > -1) {
                a[1] = "safari";
            } else if (MSIE > 0 || Edge > 0 || Trdt > 0) {
                a[1] = "IE";
            }
            return a;
    
        } catch (error) {
            console.error("Error on checkPlatform(): " + error.message);
        }
    }



