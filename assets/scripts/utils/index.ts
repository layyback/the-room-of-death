import { Sprite, SpriteFrame, resources } from "cc";

export const loadReources = (path: string): Promise<SpriteFrame[]> => {
  return new Promise((resolve, reject) => {
    resources.loadDir(path, SpriteFrame, (err, assets) => {
      if (err) {
        reject(err);
      } else {
        resolve(assets);
      }
    });
  });
};
