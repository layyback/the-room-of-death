import { AnimationClip, Sprite, SpriteFrame, animation } from "cc";
import { loadReources } from "../utils";

export class StateManager {
  spritePath: string = "texture/player/idle/top";
  wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Loop;
  spriteSpeed: number = 1 / 8;

  constructor({ spritePath, wrapMode }) {
    this.spritePath = spritePath;
    this.wrapMode = wrapMode;
  }

  async initState() {
    const animationClip = new AnimationClip(this.spritePath);

    const track = new animation.ObjectTrack();
    track.path = new animation.TrackPath()
      .toComponent(Sprite)
      .toProperty("spriteFrame");
    const [x] = track.channels();
    const playerImgs = await loadReources(this.spritePath);

    animationClip.duration = this.spriteSpeed * playerImgs.length;
    animationClip.wrapMode = this.wrapMode;
    const playerClips: Array<[number, SpriteFrame]> = playerImgs.map(
      (img, index) => {
        return [this.spriteSpeed * index, img];
      }
    );

    x.curve.assignSorted(playerClips);
    animationClip.addTrack(track);
    return animationClip;
    // const a = this.addComponent(Animation);
    // a.defaultClip = animationClip;
    // a.play();
  }
}
