export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export const getAbsoluteURL = (relativeUrl) => {
  let rootPath = `${window.location.protocol}//${window.location.host}`
  // if (window.location.hostname == "localhost") rootPath += `:${window.location.port}`
  if (relativeUrl[0] != '/') relativeUrl = `/${relativeUrl}`
  rootPath += `/#${relativeUrl}`
  return rootPath;
}