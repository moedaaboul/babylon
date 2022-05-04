(function () {
  const sasSourceParam = new URL(window.location.href).searchParams.get(
      "source"
    ),
    mainDomain = document.domain.replace(
      /([^\.]+\.)?([^\.]+\.)*(.+\..+)$/gi,
      "$2$3"
    ),
    oDate = new Date();
  oDate.setTime(oDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  if (sasSourceParam) {
    document.cookie = `source=${sasSourceParam};expires=${oDate.toGMTString()};domain=${mainDomain};path=/`;
  }
})();
