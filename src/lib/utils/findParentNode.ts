export const findParentNodeClosestToPos = ($pos: any, predicate: any) => {
  for (let i = $pos.depth; i > 0; i--) {
    const node = $pos.node(i);

    if (predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node,
      };
    }
  }
};

export const findParentNode = (predicate: any) => ({ $from }: any) =>
  findParentNodeClosestToPos($from, predicate);
