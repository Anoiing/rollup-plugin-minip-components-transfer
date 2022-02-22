import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as wxml from 'wxml';

import { PLATFORM } from '../types';
import { bundleSuffix, platformTransfer } from './platforms';

export default function wxmlTransfer({
  platform,
  template,
  output,
  name
}: {
  platform: PLATFORM;
  template: string;
  output: string;
  name: string;
}) {
  return {
    name: 'minip-components-wxmlTransfer',
    writeBundle: () => {
      const code = readFileSync(template).toString();
      let bundle = wxml.parse(code);
      if (platform !== 'wx') {
        bundle = platformTransfer(bundle, platform);
      }
      if (!output.endsWith('/')) {
        output = `${output}/`;
      }
      mkdirSync(`${output}${name}/`, { recursive: true });
      writeFileSync(
        `${output}${name}/${name}${bundleSuffix[platform]}`,
        wxml.serialize(bundle[0])
      );
    }
  };
}
