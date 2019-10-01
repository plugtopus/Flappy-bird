chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install" && !localStorage.landing && !
        localStorage['first_date_installation_ntpromo']) {
        localStorage['first_date_installation_ntpromo'] = new Date()
            .getTime();
        chrome.management.getSelf(function(info) {
            var ext_name = encodeURIComponent(info.name);
            chrome.tabs.create({
                url: 'https://plugtopus.agency/?cid=ntpromo_flappy&ext=' +
                    ext_name
            });
        });
    }
});

chrome.management.getSelf(function(info) {
    // fully encoded name is too long, and uninstall URL must be 255 characters max
    // chrome, however, can handle unicode URLs without encoding
    // https://developers.chrome.com/extensions/runtime#method-setUninstallURL
    var ext_name = info.name;

    // to be extra safe
    chrome.runtime.setUninstallURL((
        'https://plugtopus.agency/?source_type=uninstall&cid=ntpromo_flappy&ext=' +
        ext_name).slice(0, 255));
});