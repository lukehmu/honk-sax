import Tone from 'tone'

export default {
  honk(modulation) {
    const sampler = new Tone.Sampler({
      E3: 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
    }, (() => {
      // sampler will repitch the closest sample
      sampler.triggerAttack(modulation)
    })).toMaster()
  },
}
