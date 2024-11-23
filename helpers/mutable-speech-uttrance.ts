class MutableSpeechUtterance {
  private utterance: SpeechSynthesisUtterance;

  constructor() {
    this.utterance = new SpeechSynthesisUtterance();
  }

  set text(text: string) {
    this.utterance.text = text;
  }

  set voice(voice: SpeechSynthesisVoice) {
    this.utterance.voice = voice;
  }
  /**
   * value of rate should be between 0.1 to 10
   */
  set rate(value: number) {
    this.utterance.rate = value;
  }

  /**
   * value of pitch should be between 0 to 2
   */
  set pitch(value: number) {
    this.utterance.pitch = value;
  }

  get text() {
    return this.utterance.text;
  }
  get uttrance() {
    return this.utterance;
  }

  // Add more methods and properties as needed
}

export default MutableSpeechUtterance;
