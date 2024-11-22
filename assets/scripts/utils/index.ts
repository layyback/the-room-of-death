import { Sprite, SpriteFrame, resources } from "cc";
// import { enemyManager } from "../enemy/enemyManager";

export const loadReources = (path: string): Promise<SpriteFrame[]> => {
  return new Promise((resolve, reject) => {
    resources.loadDir(path, SpriteFrame, (err, assets) => {
      if (err) {
        reject(err);
      } else {
        assets.sort(sortByName);
        resolve(assets);
      }
    });
  });
};

export const sortByName = (a: SpriteFrame, b: SpriteFrame) => {
  const numA = parseInt(a.name.match(/\((\d+)\)/)?.[1] || "0", 10);
  const numB = parseInt(b.name.match(/\((\d+)\)/)?.[1] || "0", 10);
  return numA - numB;
};

export const isWall = tileInfo => {
  return tileInfo?.type?.includes("WALL");
};

export const isCliff = tileInfo => {
  return tileInfo?.type?.includes("CLIFF");
};

export const isBlock = tileInfo => {
  return !tileInfo?.type || isWall(tileInfo) || isCliff(tileInfo);
};

export const isCloseDoor = tileInfo => {};

// export const checkEnemyAllDead = () => {
//   return enemyManager.enemyList.every(enemy => enemy.hasDead);
// };
