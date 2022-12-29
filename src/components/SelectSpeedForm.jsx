const SelectSpeedForm = ({ speed, setSpeed }) => {
  const chooseSpeedHandler = (event) => {
    event.preventDefault();
    const miliseconds = speedSelectToMiliseconds();
    setSpeed(miliseconds);
  };

  const speedSelectToMiliseconds = () => {
    let speedSelect = document.getElementById("speed-select");
    if (!speedSelect) return 1000;
    const parsedSpeedSelect = parseSpeedInput(speedSelect.value);
    const miliseconds = (1 / parsedSpeedSelect) * 1000;
    return miliseconds;
  };

  const parseSpeedInput = (input) => +input.replace("x", "");

  return (
    <form>
      <label className="header__label">choose speed:</label>
      <select
        defaultValue={`x${1000 / speed}`}
        id="speed-select"
        className="header__select"
        onChange={chooseSpeedHandler}
      >
        <option value="x0.5">x0.5</option>
        <option value="x1">x1</option>
        <option value="x3">x3</option>
        <option value="x5">x5</option>
        <option value="x10">x10</option>
        <option value="x25">x25</option>
        <option value="x100">x100</option>
        <option value="x1000">x1000</option>
      </select>
    </form>
  );
};

export default SelectSpeedForm;
