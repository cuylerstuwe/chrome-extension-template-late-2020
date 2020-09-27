export default function runInPageContext(method, ...args) {

    const stringifiedMethod = method instanceof Function
        ? method.toString()
        : `() => { ${method} }`;

    const stringifiedArgs = JSON.stringify(args);

    const scriptContent = `
    (${stringifiedMethod})(...${stringifiedArgs});

    document.currentScript.parentElement
      .removeChild(document.currentScript);
  `;

    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = scriptContent;
    document.documentElement.prepend(scriptElement);

};
