import { Node, AudioSource, AudioClip, resources, director } from "cc";

export class AudioManager {
  private static _inst: AudioManager;
  public static get inst(): AudioManager {
    if (this._inst == null) {
      this._inst = new AudioManager();
    }
    return this._inst;
  }

  private _audioSource: AudioSource;
  constructor() {
    let audioMgr = new Node();
    audioMgr.name = "__audioMgr__";
    director.getScene().addChild(audioMgr);
    director.addPersistRootNode(audioMgr);
    this._audioSource = audioMgr.addComponent(AudioSource);
  }

  public get audioSource() {
    return this._audioSource;
  }

  playOneShot(sound: AudioClip | string, volume: number = 1.0) {
    if (sound instanceof AudioClip) {
      this._audioSource.playOneShot(sound, volume);
    } else {
      resources.load(`audio/${sound}`, (err, clip: AudioClip) => {
        if (err) {
          console.log(err);
        } else {
          this._audioSource.playOneShot(clip, volume);
        }
      });
    }
  }

  play(sound: AudioClip | string, volume: number = 1.0) {
    if (sound instanceof AudioClip) {
      this._audioSource.stop();
      this._audioSource.clip = sound;
      this._audioSource.play();
      this._audioSource.volume = volume;
      this._audioSource.loop = true;
    } else {
      resources.load(`audio/${sound}`, (err, clip: AudioClip) => {
        if (err) {
          console.log(err);
        } else {
          this._audioSource.stop();
          this._audioSource.clip = clip;
          this._audioSource.play();
          this._audioSource.volume = volume;
          this._audioSource.loop = true;
        }
      });
    }
  }

  stop() {
    this._audioSource.stop();
  }

  pause() {
    this._audioSource.pause();
  }

  resume() {
    this._audioSource.play();
  }
}
