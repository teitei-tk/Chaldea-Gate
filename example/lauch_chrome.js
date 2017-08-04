// @flow
import Chaldeas from 'chaldeas';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const devtools = await chaldeas.getDevtoolsInterface();

    const page = await devtools.PageDomain();
    await page.navigate({ url: 'https://github.com/teitei-tk/Chaldeas' });

    await page.domContentEventFired(async () => {
      const dom = await devtools.DOMDomain();
      const results = await dom.getFlattenedDocument();
      const divs = [];
      results.nodes.forEach((node) => {
        if (node.localName === 'div') {
          divs.push(node);
        }
      });

      console.log(divs);

      await chaldeas.terminate();
      return divs;
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
