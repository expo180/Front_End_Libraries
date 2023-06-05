const { useState, useEffect } = React;

    const DrumMachine = () => {
      const [displayText, setDisplayText] = useState("");

      const drumPads = [
        { id: "Heater-1", keyTrigger: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
        { id: "Heater-2", keyTrigger: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
        { id: "Heater-3", keyTrigger: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
        { id: "Heater-4", keyTrigger: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
        { id: "Clap", keyTrigger: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
        { id: "Open-HH", keyTrigger: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
        { id: "Kick-n'-Hat", keyTrigger: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
        { id: "Kick", keyTrigger: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
        { id: "Closed-HH", keyTrigger: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
      ];

      const handlePadClick = (pad) => {
        const audio = document.getElementById(pad.keyTrigger);
        audio.currentTime = 0;
        audio.play();
        setDisplayText(pad.id);
      };

      const handleKeyDown = (event) => {
        const pad = drumPads.find((pad) => pad.keyTrigger === event.key.toUpperCase());
        if (pad) {
          handlePadClick(pad);
        }
      };

      useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

      return (
        <div id="drum-machine">
          <div id="display">{displayText}</div>
          <div className="drum-pads">
            {drumPads.map((pad) => (
              <div key={pad.id} className="drum-pad" id={pad.id} onClick={() => handlePadClick(pad)}>
                {pad.keyTrigger}
                <audio className="clip" id={pad.keyTrigger} src={pad.src}></audio>
              </div>
            ))}
          </div>
        </div>
      );
    };

    ReactDOM.render(<DrumMachine />, document.getElementById("app"));


