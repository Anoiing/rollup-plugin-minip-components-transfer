import { createFilter } from '@rollup/pluginutils';

import { PLATFORM } from '../types';
import myTransfer from './platforms/my';

export default function jsTransfer({
  include,
  exclude,
  platform
}: {
  include?: string | string[];
  exclude?: string | string[];
  platform: PLATFORM;
}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'minip-components-jsTransfer',
    transform: (code, id) => {
      if (filter(id)) {
        if (platform === 'my') {
          return myTransfer(code);
        } else {
          return { code };
        }
      } else {
        return null;
      }
    }
  };
}
