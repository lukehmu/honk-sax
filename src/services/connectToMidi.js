
export default {
  connectToMidi() {
    // Bind functions to 'this'
    const boundOnMIDISuccess = this.onMIDISuccess.bind(this)
    const boundOnMIDIFailure = this.onMIDIFailure.bind(this)

    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
      }).then(boundOnMIDISuccess, boundOnMIDIFailure)
    } else {
      alert('No MIDI support in your browser.')
    }
  },
  // midi functions
  onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess)

    const midi = midiAccess

    const inputs = midi.inputs.values()

    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = this.onMIDIMessage
    }
  },
  // Outputs the MIDI message
  onMIDIMessage(message) {
    const { data } = message

    const note = data[1]
    // console.log(note)
    return note
  },
  onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log(`No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim ${e}`)
  },
}
