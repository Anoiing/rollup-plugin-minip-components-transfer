import generate from '@babel/generator';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

const myTransfer = (code: string) => {
  const ast = parse(code);
  let pt;

  traverse(ast, {
    enter(path) {
      // 存储父级地址
      if (t.isIdentifier(path.node, { name: 'lifetimes' })) {
        pt = path.parentPath;
      }
      // properties重命名
      if (t.isIdentifier(path.node, { name: 'properties' })) {
        path.node.name = 'props';
      }
      // attached重命名并提升层级
      if (t.isIdentifier(path.node, { name: 'attached' })) {
        path.node.name = 'didMount';
        if (pt) {
          // @ts-ignore
          pt.insertAfter(path.parentPath.node);
        }
      }
      // detached重命名并提升层级
      if (t.isIdentifier(path.node, { name: 'detached' })) {
        path.node.name = 'didUnmount';
        if (pt) {
          // @ts-ignore
          pt.insertAfter(path.parentPath.node);
        }
      }
    },
    exit(path) {
      // @ts-ignore
      if (t.isIdentifier(path.node.key, { name: 'lifetimes' })) {
        path.remove();
      }
    }
  });
  const output = generate(ast, {}, code);
  return output;
};

export default myTransfer;
