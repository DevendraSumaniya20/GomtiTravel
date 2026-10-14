let audio: AudioContext | undefined

/** Browsers keep sound off until the page is clicked; call this from the first click. */
export function unlockChime() {
  audio ??= new AudioContext()
  void audio.resume()
}

/** A short two-note chime made with Web Audio, so no sound file ships. Silent until unlocked. */
export function chime() {
  if (audio?.state !== 'running') return
  const start = audio.currentTime
  ;[880, 1320].forEach((frequency, index) => {
    const at = start + index * 0.18
    const tone = audio!.createOscillator()
    const volume = audio!.createGain()
    tone.frequency.value = frequency
    volume.gain.setValueAtTime(0.25, at)
    volume.gain.exponentialRampToValueAtTime(0.001, at + 0.5)
    tone.connect(volume).connect(audio!.destination)
    tone.start(at)
    tone.stop(at + 0.5)
  })
}
