class AudioMediaRecorder extends MediaRecorder {
  private audio_chunks: Blob[];
  private audio: HTMLAudioElement | null;
  constructor(stream: MediaStream) {
    super(stream);
    this.audio_chunks = [];
    this.audio = null;
    this.ondataavailable = (event) => {
      this.audio_chunks.push(event.data);
    };
    this.onstop = (event) => {
      const audio_blob = new Blob(this.audio_chunks);
      const audio_url = URL.createObjectURL(audio_blob);
      this.audio = new Audio(audio_url);
    };
  }
}
export default AudioMediaRecorder;
