import Tone from 'tone'

export default {
  honk(modulation) {
    const sampler = new Tone.Sampler({
      E3: 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
    }, (() => {
      // sampler will repitch the closest sample
      sampler.triggerAttack(modulation)
    })).toMaster()
    // // create a synth
    // const synth = new Tone.MembraneSynth().toMaster()// create an array of notes to be played
    // const notes = ['C3', 'Eb3', 'G3', 'Bb3']// create a new sequence with the synth and notes
    // const synthPart = new Tone.Sequence(
    //   ((time, note) => {
    //     synth.triggerAttackRelease(note, '10hz', time)
    //   }),
    //   notes,
    //   '4n',
    // )// Setup the synth to be ready to play on beat 1
    // synthPart.start()// Note that if you pass a time into the start method
    // // you can specify when the synth part starts
    // // e.g. .start('8n') will start after 1 eighth note
    // start the transport which controls the main timeline
    // Tone.Transport.start()
  },
  honkArray(notes) {
    // const notes = ['C3', 'Eb3', 'G3', 'Bb3']
    const sampler = new Tone.Sampler({
      E3: 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
    }).toMaster()
    // const notes = ['C3', 'Eb3', 'G3', 'Bb3']
    const synthPart = new Tone.Sequence(
      ((time, note) => {
        sampler.triggerAttackRelease(note, time)
      }),
      notes,
    )
    // synthPart.stop()
    Tone.Transport.stop()
    synthPart.start()
    Tone.Transport.start()
  },
}
