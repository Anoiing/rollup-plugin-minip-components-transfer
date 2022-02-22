import { PLATFORM } from '../../types';
import my from './my';
import qq from './qq';
import swan from './swan';
import tt from './tt';

const M = { my, qq, swan, tt };
export const platformTransfer = (ast: any, platform: PLATFORM) => {
  const ENUMS = M[platform];
  const nodesErgodic = (ast: any) => {
    return ast.map((n: any) => {
      let ns = n;
      if (n.attributes) {
        Object.keys(n.attributes).forEach((k) => {
          // 修改属性名
          const nk = ENUMS[k];
          if (nk) {
            ns.attributes[nk] = n.attributes[k];
            delete ns.attributes[k];
          }
        });
      }
      if (n.childNodes) {
        ns.childNodes = nodesErgodic(n.childNodes);
      }
      return ns;
    });
  };
  return nodesErgodic(ast);
};

export const bundleSuffix = {
  wx: '.wxml',
  my: '.axml',
  swan: '.swan',
  tt: '.ttml',
  qq: '.qml'
};
