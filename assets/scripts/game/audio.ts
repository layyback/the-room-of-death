import {
  _decorator,
  AudioClip,
  AudioSource,
  Component,
  Node,
  resources
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("audioManager")
export class audioManager extends Component {
  audioSource: AudioSource = null;
  start() {
    this.audioSource = this.getComponent(AudioSource);
  }

  play(name: string) {
    resources.load(`audio/${name}`, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
      } else {
        this.audioSource.playOneShot(clip, 1);
      }
    });
  }

  update(deltaTime: number) {}
}
