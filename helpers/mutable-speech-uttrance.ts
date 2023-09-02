class MutableSpeechUtterance {
    private utterance: SpeechSynthesisUtterance;
  
    constructor() {
      this.utterance = new SpeechSynthesisUtterance();
    }
  
    set text(text: string) {
      this.utterance.text = text;
    }

    set voice(voice:SpeechSynthesisVoice) {
      this.utterance.voice = voice;
    }
  
    get text() {
      return this.utterance.text;
    }
    get uttrance(){
        return this.utterance;
    }
  
    // Add more methods and properties as needed
  }
  
  
  export default MutableSpeechUtterance;