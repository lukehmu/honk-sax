import Tone from 'tone'

const honkmp3 = 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3'

export default {
  honk(modulation) {
    const sampler = new Tone.Sampler({
      E3: honkmp3,
    }, (() => {
      // sampler will repitch the closest sample
      sampler.triggerAttack(modulation)
    })).toMaster()
  },
  honkArray(notes) {
    // const notes = ['C3', 'Eb3', 'G3', 'Bb3']
    const sampler = new Tone.Sampler({
      E3: honkmp3,
    }).toMaster()
    // const notes = ['C3', 'Eb3', 'G3', 'Bb3']
    const synthPart = new Tone.Sequence(
      ((time, note) => {
        sampler.triggerAttackRelease(note, time)
      }),
      notes,
    )
    Tone.Transport.stop()
    synthPart.start()
    Tone.Transport.start()
  },
  stopHonk() {
    Tone.Transport.stop()
  },
}
